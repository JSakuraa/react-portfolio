import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export interface CodeBlockValue {
  _type: 'code'
  code: string
  language?: string
  filename?: string
  highlightedLines?: number[]
}

interface CodeBlockProps {
  value: CodeBlockValue
}

export function CodeBlock({ value }: CodeBlockProps) {
  const { code, language = 'text', filename } = value

  return (
    <div className="my-6 rounded-lg overflow-hidden shadow-lg">
      {filename && (
        <div className="bg-charcoal-darkest px-4 py-2 text-sm text-beige-light font-mono flex items-center">
          <svg
            className="w-4 h-4 mr-2 text-orange"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {filename}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        customStyle={{
          margin: 0,
          borderRadius: filename ? '0 0 0.5rem 0.5rem' : '0.5rem',
          fontSize: '0.875rem',
        }}
        lineNumberStyle={{
          minWidth: '2.5em',
          paddingRight: '1em',
          color: '#636d83',
          userSelect: 'none',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}
