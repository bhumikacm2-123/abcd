const translateButton = document.getElementById("translateBtn");

translateButton.addEventListener("click", async function () {

    const text = document.getElementById("inputText").value;
    const sourceLanguage = document.getElementById("sourceLanguage").value;
    const targetLanguage = document.getElementById("targetLanguage").value;
    const outputText = document.getElementById("outputText");

    if (text.trim() === "") {
        outputText.textContent = "Please enter some text.";
        return;
    }

    outputText.textContent = "Translating...";

    try {

        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`;

        const response = await fetch(url);
        const data = await response.json();

        outputText.textContent = data.responseData.translatedText;

    } catch (error) {

        outputText.textContent = "Translation failed. Please try again.";

        console.error(error);
    }
});
const copyButton = document.getElementById("copyBtn");

copyButton.addEventListener("click", function () {

    const translatedText = document.getElementById("outputText").textContent;

    navigator.clipboard.writeText(translatedText);

    alert("Translation copied!");
});
const speakButton = document.getElementById("speakBtn");

speakButton.addEventListener("click", function () {

    const translatedText = document.getElementById("outputText").textContent;

    if (translatedText.trim() === "" ||
        translatedText === "Translation will appear here...") {
        alert("Please translate some text first.");
        return;
    }

    const speech = new SpeechSynthesisUtterance(translatedText);

    speech.lang = document.getElementById("targetLanguage").value;

    window.speechSynthesis.speak(speech);
});
const swapButton = document.getElementById("swapBtn");

swapButton.addEventListener("click", function () {

    const sourceLanguage = document.getElementById("sourceLanguage");
    const targetLanguage = document.getElementById("targetLanguage");

    // Swap the selected languages
    const tempLanguage = sourceLanguage.value;

    sourceLanguage.value = targetLanguage.value;
    targetLanguage.value = tempLanguage;

    // Swap the text
    const inputText = document.getElementById("inputText");
    const outputText = document.getElementById("outputText");

    const tempText = inputText.value;

    inputText.value = outputText.textContent;
    outputText.textContent = tempText;
});
// Clear button
const clearButton = document.getElementById("clearBtn");

clearButton.addEventListener("click", function () {
    document.getElementById("inputText").value = "";
    document.getElementById("outputText").textContent =
        "Your translation will appear here.";
    document.getElementById("charCount").textContent = "0";
});