export interface GuidelineAction {
  item: string;
  important?: string;
  what_it_means?: string;
  where_to_find_it?: string;
  what_to_prepare?: string;
}

export interface GuidelinePage {
  page: number;
  image?: string;
  actions: GuidelineAction[];
}

export interface GuidelinesResult {
  pages: GuidelinePage[];
}

export async function learnGuidelines(
  file: File,
  language: string = "English"
): Promise<GuidelinesResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("language", language);

  const response = await fetch("/api/v1/llm/document/guidelines", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Guidelines request failed: ${errorText}`);
  }

  return response.json();
}
