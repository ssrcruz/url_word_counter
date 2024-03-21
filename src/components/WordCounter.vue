<template>
  <input type="text" v-model="url" placeholder="Type in url" />
  <button @click="fetchWordCount">Fetch word count</button>
  <strong> Top 25 word counts within the inner HTML: {{ top25Words }} </strong>
</template>

<script>
import axios from "axios";
export default {
  name: "WordCounter",
  data() {
    return {
      url: "",
      webpage: "",
      wordCountInnerHtml: {},
      trackWords: {},
      top25Words: [],
    };
  },
  methods: {
    findAllWords() {
      return this.webpage
        .split(/\b/)
        .filter(
          (word) =>
            word !== " " && !word.match("[0-9]") && word.match("[a-zA-Z]+")
        );
    },
    tracksWordCounts(allWords) {
      allWords.forEach((word) => {
        if (!this.trackWords[word]) {
          this.trackWords[word] = 1;
        } else {
          this.trackWords[word] = this.trackWords[word] += 1;
        }
      });
    },
    sortWordCountsByHighest() {
      return Object.entries(this.trackWords)
        .sort(([, a], [, b]) => {
          // Each entry is an array and we only need the count value
          return b - a; // We sort by highest count value
        })
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {}); // Reassigns the value with the correct keys
    },
    fetchWordCount() {
      axios
        .get("http://localhost:3000/url_word_counter", {
          params: { url: this.url },
        })
        .then((resp) => {
          this.webpage = resp.data;
          const allWords = this.findAllWords();
          this.tracksWordCounts(allWords);
          const wordCounts = this.sortWordCountsByHighest();
          this.top25Words = Object.fromEntries(
            Object.entries(wordCounts).slice(0, 25)
          );
        });
    },
  },
};
</script>
<style>
input,
button {
  padding: 4px;
}

button {
  margin: 16px;
}
</style>
