let inputField = document.getElementById("input")
let outputField = document.getElementById("output")
let wordSymbols = document.getElementById("wordSymbols")
let wordCount = document.getElementById("wordCount")

function splitTextSmart(textToSplit) {
    if (textToSplit === undefined) {
        return []
    }

    processedText = ""
    symbols = wordSymbols.value.split(" ")
    for (let i = 0; i < textToSplit.length; i++) {
        if (symbols.includes(textToSplit[i])) {
            processedText += " " + textToSplit[i] + " "
        } else {
            processedText += textToSplit[i]
        }
    }

    words = processedText.split(" ")

    //if (allowEmpty) {
    //    return words
    //}
    processedWords = []
    for (let i = 0; i < words.length; i++) {
        if (words[i] !== "") {
            processedWords.push(words[i])
        }
    }
    return processedWords
}

function test(a) {
    console.log(a)
}

function generate() {
    inputText = inputField.value
    test(inputText)

    words = splitTextSmart(inputText)
    lastWord = ""
    wordGen = {}
    for (let i = 0; i < words.length; i++) {
        word = words[i]
        if (word == "") {
            continue
        }

        if (lastWord != "") {
            lastWordLower = lastWord.toLowerCase()

            if (wordGen.hasOwnProperty(lastWordLower)) {
                wordGen[lastWordLower].push(word)
            } else {
                wordGen[lastWordLower] = [word]
            }
        }
        lastWord = word
    }

    
    generatedWords = splitTextSmart(outputField.value)
    console.log("Old words", generatedWords)
    count = Number(wordCount.value)// + generatedWords.length
    console.log("Max words", count)
    
    if (generatedWords.length == 0) {
        wordGenKeys = Object.keys(wordGen)
        generatedWords = [wordGenKeys[Math.floor(Math.random() * wordGenKeys.length)]]
    }
    for (let i = 0; i < count; i++) {
        lastWord = generatedWords[generatedWords.length - 1].toLowerCase()
        if (!wordGen.hasOwnProperty(lastWord)) {
            break
        }
        possibleWords = wordGen[lastWord]
        nextWord = possibleWords[Math.floor(Math.random() * possibleWords.length)]
        generatedWords.push(nextWord)
    }

    generatedText = ""
    for (let i in generatedWords) {
        word = generatedWords[i]
        if (!symbols.includes(word)) {
            generatedText += " "
        }
        generatedText += word
    }
    if (generatedText[0] == " ") {
        generatedText = generatedText.slice(1)
    }

    console.log("Generated text", generatedText)

    outputField.value = generatedText
}
function toggleAdvSettings() {
    settings = document.getElementById('advSettings')
    if (settings.style.display=='none') {
        settings.style.display = 'block'
    } else {
        settings.style.display = 'none'
    }
}