interface LoadingProps {
  message?: string
}

export function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-orange border-t-transparent rounded-full animate-spin" />
        <p className="text-charcoal text-lg">{message}</p>
      </div>
    </div>
  )
}

export function PageLoading({ message = 'Loading...' }: LoadingProps) {
  return (
    <main className="bg-primary min-h-screen flex items-center justify-center">
      <Loading message={message} />
    </main>
  )
}
