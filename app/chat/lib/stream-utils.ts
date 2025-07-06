export interface StreamState {
  message: string;
  isStreaming: boolean;
  error: string | null;
}

export async function streamCompletion(
  prompt: string,
  onChunk: (chunk: string) => void,
  onDone: () => void,
  onError: (error: string) => void
) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: prompt }),
    });

    if (!response.ok) {
      throw new Error("Failed to get response");
    }

    // Handle streaming response
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done && reader) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;

      if (done) {
        onDone();
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }
  } catch (error) {
    console.error("Error in streamCompletion:", error);
    onError(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
}
