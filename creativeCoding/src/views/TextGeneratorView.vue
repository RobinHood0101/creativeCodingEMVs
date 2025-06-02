<script>
export default {
    data() {
        return {
            fileInfo: "",
            text: "Das ist ein Hund. Das ist ein Haus. Das kann nicht sein.",
            generatedText: "",
        };
    },
    methods: {
        readFile() {
            const file = event.target.files[0];
            const info = `File Name: ${file.name} File Size: ${file.size} bytes File Type: ${file.type}`;
            this.fileInfo = info;
            const reader = new FileReader();
            reader.onload = (e) => {
                this.text = e.target.result;
            };
            reader.readAsText(file);
        },
        generateText() {
            // save all sentences in array
            let wordArr = [];
            const sentences = this.text.trim().split(".");
            for (let i = 0; i < sentences.length; i++) {
                let words = sentences[i].trim().split(" ");
                if (words.length > 0 && words[0] !== "") {
                    words.push(".");
                    wordArr.push(words);
                }
            }

            // search amount of different words
            let uniqueWords = [];
            let amountOfUniqueWords = 0;
            for (let x in wordArr) {
                for (let y in wordArr[x]) {
                    if (uniqueWords.includes(wordArr[x][y])) {
                        console.warn("Word already exists");
                    } else {
                        uniqueWords.push(wordArr[x][y]);
                    }
                }
            }
            amountOfUniqueWords = uniqueWords.length;
            //console.log("Unique Words: " + uniqueWords);
            //console.log("Amount of unique words: " + amountOfUniqueWords);

            // Iterate over sentences
            let possibleWords = {};

            // loop over unique words
            for (let x in uniqueWords) {
                // loop over sentences
                for (let y in wordArr) {
                    const index = wordArr[y].indexOf(uniqueWords[x]);

                    // Check if key already exists
                    if (!possibleWords[uniqueWords[x]]) {
                        possibleWords[uniqueWords[x]] = [];
                    }

                    // next word after unique word
                    if (index !== -1) {
                        //console.log(uniqueWords[x]);
                        const nextIndex = wordArr[y].indexOf(uniqueWords[x]) + 1;
                        // console.log(nextIndex);
                        //console.log(wordArr[y]);

                        // save in possibleWords
                        if (nextIndex >= wordArr[y].length) {
                            //console.warn();
                            possibleWords[uniqueWords[x]].push(wordArr[0][0]);
                            //console.log(possibleWords);
                        } else {
                            //console.log(wordArr[y][nextIndex]);

                            possibleWords[uniqueWords[x]].push(wordArr[y][nextIndex]);
                            //console.log(possibleWords);
                        }

                        //console.log();
                    }
                }
            }
            //console.log(possibleWords);

            // Add procentage of selection in possible Word array 2 "Das" 1 "Der" -> 0.66 Das 0.33 Der
            /*
            let testobj = {
                ".": [["Das", 0.66], ["Der", 0.33]]
                "Das": [["Haus", 0.66], ["Test", 0.33]]
            }
            */
            const markovChain = {};
            //console.log(possibleWords["Das"]);
            for (const word in possibleWords) {
                //console.log(word);
                // ich befinde mich in ["Das", "Das", "Das"];
                // loop over possible words for this word
                let wordsProbability = [];
                //console.log("Possible words for: " + word); // output format: [['Haus', 0.667], ['Test', 0.333]]
                markovChain[word] = this.calculateProbability(possibleWords[word]);
            }
            //console.log(markovChain);

            // Generation
            /*
            markovChain = {
                ".":[["Das", 1]],
                "Das": [["ist", 0.67], ["kann", 0.33]]
            }
            */
            let lastWord = "Das";
            for (let i = 0; i < 20; i++) {
                //console.log(markovChain[lastWord]);
                // Generate random number
                const randomNum = Math.random();
                // loop over words an check which one to use
                /* for (let z = 0; z < markovChain[lastWord].length; z++) {
                    // word: markovChain[lastWord][z][0]
                    // value: markovChain[lastWord][z][1]
                                        if (markovChain[lastWord][z][1] < randomNumber) {
                    }
                } */

                // select word
                let sum = 0;

                for (const [word, probability] of markovChain[lastWord]) {
                    sum += probability;
                    if (randomNum <= sum) {
                        lastWord = word;
                        this.generatedText += ` ${word}`;
                    }
                }
            }
        },
        calculateProbability(arr) {
            const counts = {};

            arr.forEach((word) => {
                counts[word] = (counts[word] || 0) + 1;
            });

            const total = arr.length;

            const result = Object.entries(counts).map(([word, count]) => [
                word,
                parseFloat((count / total).toFixed(3)),
            ]);

            return result;
        },
    },
};
</script>

<template>
    <main>
        <h1>Markov chain text generator</h1>
        <input type="file" id="fileInput" @change="readFile" />
        <div id="fileInfo">{{ fileInfo }}</div>
        <button @click="generateText">Generate</button>
        <h2>Generated Text</h2>
        <!-- <p>{{ text }}</p> -->
        <hr />
        <div id="generatedText">{{ generatedText }}</div>
    </main>
</template>
