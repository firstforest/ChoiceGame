(require 'clojure.java.io)
(require 'clojure.string)

(defn make-question [[q y y-face n n-face]]
  (str "{question = \"" q "\", yesMessage = \"" y "\", yesFace = " y-face ", noMessage = \"" n "\", noFace = " n-face "}"))

(defn separate-question [line]
  (let
      [question (partition 6 line)]
    (clojure.string/join ",\n" (map #(make-question (map clojure.string/trim %)) question))))

(defn make-questions [choice]
  (let
    [[lineA restA] (split-with #(not= "----END_A" %) choice)
     [lineB restB] (split-with #(not= "----END_B" %) (rest restA))
     [lineC restC] (split-with #(not= "----END_C" %) (rest restB))]
    (str (separate-question lineA) "\n\n" (separate-question lineB) "\n\n" (separate-question lineC))))

(with-open
  [rdr  (clojure.java.io/reader "choice.txt")
     wtr (clojure.java.io/writer "Questions.txt")]
  (.write wtr (make-questions (line-seq rdr))))
