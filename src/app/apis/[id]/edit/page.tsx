'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAPI } from '@/contexts/APIContext';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase';
import OpenAPISchemaValidator from 'openapi-schema-validator';
import { useSession } from 'next-auth/react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

export default function EditAPIPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { apis, isLoading, error } = useAPI();
  const [api, setApi] = useState<any>(null);
  const [schema, setSchema] = useState<string>('');
  const [schemaLoading, setSchemaLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const { data: session } = useSession();
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newLine, setNewLine] = useState<number>(1);
  const [adding, setAdding] = useState(false);

  const editorRef = useRef<any>(null);

  // Group validation messages
  const groupedValidation = validationErrors.reduce(
    (acc, err) => {
      const severity = err.severity || 'error';
      if (!acc[severity]) acc[severity] = [];
      acc[severity].push(err);
      return acc;
    },
    { error: [], warning: [], info: [] } as Record<string, any[]>
  );

  // Scroll to line in Monaco
  const handleScrollToLine = (line: number) => {
    if (editorRef.current && typeof line === 'number') {
      editorRef.current.revealLineInCenter(line);
      editorRef.current.setPosition({ lineNumber: line, column: 1 });
      editorRef.current.focus();
    }
  };

  // Monaco onMount to get editor instance
  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    const foundApi = apis.find(a => a.id === params.id);
    if (foundApi) {
      setApi(foundApi);
    } else if (!isLoading) {
      router.push('/dashboard');
    }
  }, [apis, params.id, isLoading, router]);

  useEffect(() => {
    async function fetchSchema() {
      if (!params.id) return;
      setSchemaLoading(true);
      console.log('[SchemaEditor] Fetching schema for API ID:', params.id);
      const { data, error } = await supabase
        .from('apis')
        .select('schema')
        .eq('id', params.id)
        .single();
      if (data && data.schema) {
        setSchema(data.schema);
        console.log('[SchemaEditor] Loaded schema:', data.schema);
      }
      setSchemaLoading(false);
      if (error) console.error('[SchemaEditor] Error loading schema:', error);
    }
    fetchSchema();
  }, [params.id]);

  // Fetch comments for this API
  useEffect(() => {
    async function fetchComments() {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('api_id', params.id)
        .order('created_at', { ascending: true });
      if (data) setComments(data);
    }
    fetchComments();
  }, [params.id]);

  // Debounced auto-save
  const handleSchemaChange = (value: string | undefined) => {
    setSchema(value ?? '');
    console.log('[SchemaEditor] Schema changed:', value);
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(async () => {
      setIsSaving(true);
      await supabase
        .from('apis')
        .update({ schema: value ?? '' })
        .eq('id', params.id);
      setIsSaving(false);
      console.log('[SchemaEditor] Schema auto-saved');
    }, 1000);
  };

  // Validate schema on change
  useEffect(() => {
    if (!schema) {
      setValidationErrors([]);
      return;
    }
    let parsed: any;
    try {
      parsed = JSON.parse(schema);
    } catch (e) {
      setValidationErrors([{ message: 'Invalid JSON: ' + (e as Error).message }]);
      console.log('[SchemaEditor] Validation: Invalid JSON');
      return;
    }
    try {
      console.log('[SchemaEditor] Running OpenAPI validation');
      const validator = new OpenAPISchemaValidator({ version: 3 });
      const result = validator.validate(parsed);
      setValidationErrors(result.errors || []);
      console.log('[SchemaEditor] Validation results:', result.errors);
    } catch (e) {
      setValidationErrors([{ message: 'Validation error: ' + (e as Error).message }]);
      console.error('[SchemaEditor] Validation error:', e);
    }
  }, [schema]);

  // Add a new comment
  const handleAddComment = async () => {
    if (!newComment.trim() || !session?.user?.id) return;
    setAdding(true);
    const { error } = await supabase
      .from('comments')
      .insert({
        api_id: params.id,
        user_id: session.user.id,
        line_number: newLine,
        text: newComment,
      });
    setAdding(false);
    setNewComment('');
    // Refresh comments
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('api_id', params.id)
      .order('created_at', { ascending: true });
    if (data) setComments(data);
  };

  if (isLoading || schemaLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!api) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
      <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white">Edit API Schema</h1>
          <p className="mt-1 text-sm text-gray-400">
            Update the API schema below
          </p>
        </motion.div>
        <div className="bg-gray-900 rounded-lg p-4">
          {(MonacoEditor as any) && (
            <MonacoEditor
              height="500px"
              defaultLanguage="json"
              value={schema}
              options={{ theme: 'vs-dark', minimap: { enabled: false } }}
              onChange={handleSchemaChange}
              onMount={handleEditorMount}
            />
          )}
        </div>

        {isSaving && (
          <div className="text-xs text-gray-400 mt-2">Saving...</div>
        )}
      </div>

      {/* Validation Results Panel: static placeholder UI only */}
      <div className="w-96 bg-gray-900 rounded-lg p-4 h-[540px] overflow-y-auto flex flex-col sticky top-8">
        <h2 className="text-lg font-semibold text-white mb-2">Validation Results</h2>
        <div className="mb-4">
          <div className="font-bold mb-1 text-red-400">Errors</div>
          <ul className="text-sm space-y-1 text-red-300">
            <li className="italic opacity-60">No errors</li>
          </ul>
        </div>
        <div className="mb-4">
          <div className="font-bold mb-1 text-yellow-400">Warnings</div>
          <ul className="text-sm space-y-1 text-yellow-300">
            <li className="italic opacity-60">No warnings</li>
          </ul>
        </div>
        <div className="mb-4">
          <div className="font-bold mb-1 text-blue-400">Infos</div>
          <ul className="text-sm space-y-1 text-blue-300">
            <li className="italic opacity-60">No info</li>
          </ul>
        </div>
        <div className="text-green-400 text-xl font-bold text-center mt-8">Schema is valid</div>
      </div>
    </div>
  );
}
