<script>
import p5 from "p5";

export default {
    data() {
        return {
            fileInfo: "",
            text: "",
            generatedText: "",
            topWords: [],
        };
    },
    methods: {
        readFile() {
            const file = event.target.files[0];
            // Validate file
            if (file.type !== "text/plain") {
                alert("Only txt files are allowed");
                return;
            } else if (file.size > 10000) {
                alert("File is too large");
                return;
            }
            const info = `File Name: ${file.name} File Size: ${file.size} bytes File Type: ${file.type}`;
            this.fileInfo = info;
            const reader = new FileReader();
            reader.onload = (e) => {
                this.text = e.target.result;
            };
            reader.readAsText(file);
        },
        generateText() {
            try {
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
                console.log(
                    "%cUnique Words: " + uniqueWords,
                    "color: green; background-color: white; padding: 2px; border-radius: 3px; font-size: 20px;"
                );
                console.log(
                    "%cAmount of unique words: " + amountOfUniqueWords,
                    "color: green; background-color: white; padding: 2px; border-radius: 3px; font-size: 20px;"
                );

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
                            const nextIndex = wordArr[y].indexOf(uniqueWords[x]) + 1;

                            // save in possibleWords
                            if (nextIndex >= wordArr[y].length) {
                                possibleWords[uniqueWords[x]].push(wordArr[0][0]);
                            } else {
                                possibleWords[uniqueWords[x]].push(wordArr[y][nextIndex]);
                            }
                        }
                    }
                }

                // Add procentage of selection in possible Word array 2 "Das" 1 "Der" -> 0.66 Das 0.33 Der
                /*
                    let testobj = {
                        ".": [["Das", 0.66], ["Der", 0.33]]
                        "Das": [["Haus", 0.66], ["Test", 0.33]]
                    }
                */
                const markovChain = {};
                for (const word in possibleWords) {
                    // ich befinde mich in ["Das", "Das", "Das"];
                    // loop over possible words for this word
                    let wordsProbability = [];
                    //console.log("Possible words for: " + word); // output format: [['Haus', 0.667], ['Test', 0.333]]
                    markovChain[word] = this.calculateProbability(possibleWords[word]);
                }
                console.log(
                    "%cMarkov Chain:",
                    "color: green; background-color: white; padding: 2px; border-radius: 3px; font-size: 20px;"
                );
                console.log(markovChain);

                // Generation
                /*
                    markovChain = {
                        ".":[["Das", 1]],
                        "Das": [["ist", 0.67], ["kann", 0.33]]
                    }
                */

                let lastWord = uniqueWords[(Math.random() * uniqueWords.length).toFixed()]; // select random word to start
                for (let i = 0; i < 50; i++) {
                    // Generate random number
                    const randomNum = Math.random();

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
                console.log("%cText generated!", "color: green; font-size: 40px;");

                // Word Map
                this.generateWordMap(uniqueWords, this.text);
            } catch (error) {
                console.error("An error occurred during the generation of the text: " + error);
                alert("An error occurred during the text generation (check console for more details)");
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
        generateWordMap(uniqueWords, text) {
            let numberOfWords = []; // [["Word", 2], ["Word2", 1]]
            const words = text
                .replace(/[.,!?]/g, "")
                .trim()
                .split(/\s+/);

            for (let i = 0; i < uniqueWords.length; i++) {
                let currentWord = uniqueWords[i];
                let countForWord = 1;

                for (let z = 0; z < words.length; z++) {
                    if (currentWord === words[z]) {
                        countForWord++;
                    }
                }
                numberOfWords.push([currentWord, countForWord]);
            }
            const sortedNumberOfWords = numberOfWords.sort((a, b) => b[1] - a[1]);

            // give out top 10 most used words
            console.log(
                "%cMost used words:",
                "color: green; background-color: white; padding: 2px; border-radius: 3px; font-size: 20px;"
            );
            for (let i = 0; i < 10; i++) {
                console.log(sortedNumberOfWords[i]);
            }
            this.topWords = sortedNumberOfWords.slice(0, 20);

            // Draw Word Map
            if (this.p) {
                this.p.remove();
            }
            this.p = new p5(this.sketch, this.$refs.wordmap);
        },
        sketch(p) {
            p.setup = () => {
                p.createCanvas(600, 400);
                p.background(255);

                // determine the maximum number of topWords
                const maxCount = Math.max(...this.topWords.map(([_, count]) => count));

                for (let i = 0; i < this.topWords.length; i++) {
                    const [word, count] = this.topWords[i];

                    // calculate font size
                    const size = p.map(count, 0, maxCount, 10, 80);
                    p.textSize(size);

                    const x = p.random(20, p.width - 100);
                    const y = p.random(50, p.height - 20);

                    p.text(word, x, y);
                }
            };
        },
    },
};
</script>

<template>
    <main>
        <h1>Markov chain text generator</h1>
        <input type="file" id="fileInput" @change="readFile" />
        <div id="fileInfo">{{ fileInfo }}</div>
        <button @click="generateText" v-if="this.text">Generate</button>
        <h2>Generated Text</h2>
        <hr />
        <div id="generatedText">{{ generatedText }}</div>
        <h2>Word Map</h2>
        <!-- p5js canvas -->
        <div ref="wordmap"></div>
    </main>
</template>
