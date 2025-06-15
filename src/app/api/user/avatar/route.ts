import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { diagnosticLogger } from '@/lib/diagnostics';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  diagnosticLogger.log({
    step: 'api_request',
    request: {
      method: 'POST',
      headers: Object.fromEntries(request.headers.entries()),
    },
  });

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Unauthorized: No session or email',
        }],
      });
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('avatar') as File;
    if (!file) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'No file uploaded',
        }],
      });
      return new NextResponse('No file uploaded', { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Invalid file type',
          meta: { type: file.type },
        }],
      });
      return new NextResponse('Invalid file type', { status: 400 });
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'File too large',
          meta: { size: file.size },
        }],
      });
      return new NextResponse('File too large', { status: 400 });
    }

    // Generate unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${uuidv4()}-${file.name}`;
    const filePath = `avatars/${filename}`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin
      .storage
      .from('avatars')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to upload avatar',
          meta: uploadError,
        }],
      });
      throw uploadError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin
      .storage
      .from('avatars')
      .getPublicUrl(filePath);

    // Update user avatar in database
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        image: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('email', session.user.email);

    if (updateError) {
      diagnosticLogger.log({
        step: 'error',
        errors: [{
          message: 'Failed to update user avatar',
          meta: updateError,
        }],
      });
      throw updateError;
    }

    diagnosticLogger.log({
      step: 'api_request',
      response: {
        status: 200,
        body: { url: publicUrl },
      },
    });

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    diagnosticLogger.log({
      step: 'error',
      errors: [{
        message: 'Avatar upload error',
        meta: error instanceof Error ? error.message : 'Unknown error',
      }],
    });
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 