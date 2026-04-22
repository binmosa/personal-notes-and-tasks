const apiKey = "AIzaSyALM_yjxCGx1ECoNmCQwZ9wIv-ovgjYzgU"; // From the user's .env.local shown earlier

async function listModels() {
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();
