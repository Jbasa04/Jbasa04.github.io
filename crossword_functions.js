function sortallWords(n, allwords) {
    let k, i;
    let temporaryValue;
    k = 0;
    while (k < n - 1) {
        for (i = 0; i < n - k; i++) {
            if (allwords[i].length < allwords[i + 1].length) {
                temporaryValue = allwords[i];
                allwords[i] = allwords[i + 1];
                allwords[i + 1] = temporaryValue;
            }
        }
        k++;
    }
}

function randomWords(start, count, words) {
    for (let i = start; i < count; i++) {
        for (let j = start; j < count - 1; j++) {
            let randomValue = Math.floor(Math.random() * (count - j)) + j;
            if (i !== randomValue) {
                let temp = words[randomValue];
                words[randomValue] = words[j];
                words[j] = temp;
            }
        }
    }
}

function createPuzzleBoard(eachcrossword) {
    let i, k;
    i = 0;
    while (i < 15) {
        for (k = 0; k < 15; k++) {
            eachcrossword[i][k] = '.';
        }
        i++;
    }
}

function displayBoard(board) {
    console.log("\nSolution:\n");
    console.log("-");
    for (let i = 0; i < 15; i++) {
        console.log("-");
    }
    console.log("|\n");
    for (let i = 0; i < 15; i++) {
        console.log("|");
        for (let j = 0; j < 15; j++) {
            console.log(board[i][j]);
        }
        console.log("|\n");
    }
    console.log("-");
    for (let i = 0; i < 15; i++) {
        console.log("-");
    }
    console.log("-\n");
}

function isValidWord(word) {
    if (word.length > MAX_WORD_LENGTH - 1) {
        console.log(`No word can be longer than ${MAX_WORD_LENGTH - 1} letters. Please enter a valid word.`);
        return 0;
    }
    if (word.length < 2) {
        console.log("Words have to be at least 2 letters. Please enter a valid word.");
        return 0;
    }
    for (let i = 0; i < word.length; i++) {
        if (!isalpha(word[i])) {
            console.log("Words must contain letters only. Please enter a valid word.");
            return 0;
        }
    }
    return 1;
}

function getInput(allwords, maxWords, source, file) {
    let numberofWords = 0;
    let i;
    let newWord;
    if (source === 1) {
        console.log("Please enter a list of words:\n");
    }
    i = 0;
    while (i < maxWords) {
        if (source === 1) {
            if (scanf(" %s", newWord) !== 1) {
                break;
            }
        } else if (source === 2 && file !== null) {
            if (fgets(newWord, MAX_WORD_LENGTH, file) === null) {
                break;
            }
            newWord[strcspn(newWord, "\n")] = '\0';
        } else {
            console.log("Invalid source. Exiting...\n");
            break;
        }
        if (strcmp(newWord, ".") === 0) {
            break;
        }
        if (isValidWord(newWord)) {
            allwords[i] = newWord;
            i++;
        }
    }
    numberofWords = i;
    for (i = 0; i < numberofWords; i++) {
        for (let k = 0; k < allwords[i].length; k++) {
            allwords[i][k] = allwords[i][k].toUpperCase();
        }
    }
    return numberofWords;
}

function longestWord(n, words, eachcrossword, location) {
    let i, j;
    i = 0;
    while (i < words[0].length) {
        eachcrossword[7][(15 - words[0].length) / 2 + i] = words[0][i];
        i++;
    }
    location[0][0] = 7;
    location[0][1] = (15 - words[0].length) / 2;
    location[0][2] = 1;
}

function locateWords(number, words, eachcrossword, location) {
    let allplaced = 0, randomized = 0, vertical = 0, horizontal = 1, placed = 1, k;
    k = 1;
    let skippedWords = new Array(number);
    let numSkipped = 0;
    sortallWords(number, words);
    while (k < number) {
        placed = 0;
        randomized = 0;
        let successfulAttempt = 0;
        if (vertical < horizontal) {
            while (placed !== 1) {
                if (randomized > (3 * (number - k))) {
                    console.log(`Skipping word '${words[k]}' as it can't be placed.`);
                    skippedWords[numSkipped++] = k;
                    break;
                }
                placed = locateVertical(words[k], eachcrossword, location[k]);
                if (placed === 1) {
                    successfulAttempt = 1;
                    break;
                } else {
                    placed = locateHorizontal(words[k], eachcrossword, location[k]);
                    if (placed === 1) {
                        successfulAttempt = 1;
                        break;
                    } else {
                        placed = 0;
                        randomWords(k, number, words);
                        randomized++;
                        continue;
                    }
                }
            }
        } else {
            while (placed !== 1) {
                if (randomized > (3 * (number - k))) {
                    console.log(`Skipping word '${words[k]}' as it can't be placed.`);
                    skippedWords[numSkipped++] = k;
                    break;
                }
                placed = locateVertical(words[k], eachcrossword, location[k]);
                if (placed === 1) {
                    successfulAttempt = 1;
                    break;
                } else {
                    placed = locateHorizontal(words[k], eachcrossword, location[k]);
                    if (placed === 1) {
                        successfulAttempt = 1;
                        break;
                    } else {
                        placed = 0;
                        randomWords(k, number, words);
                        randomized++;
                        continue;
                    }
                }
            }
        }
        if (successfulAttempt || k === (number - 1)) {
            allplaced = 1;
        }
        k++;
    }
    for (let i = 0; i < numSkipped; i++) {
        k = skippedWords[i];
        placed = 0;
        let attempts = 0;
        while (!placed && attempts < 3) {
            if (locateVertical(words[k], eachcrossword, location[k])) {
                placed = 1;
            } else if (locateHorizontal(words[k], eachcrossword, location[k])) {
                placed = 1;
            } else {
                randomWords(k, number, words);
                attempts++;
            }
        }
        if (!placed) {
            console.log(`Nowhere to place skipped word after processing other words'${words[k]}'.`);
        }
    }
    return allplaced;
}

function validVertical(i, j, startRow, eachcrossword, location, word) {
    let k, x, y, valid = 1;
    x = j - 1;
    y = j + 1;
    k = 0;
    while (k < word.length) {
        if ((k + startRow) !== i) {
            if (isalpha(eachcrossword[startRow + k][x]) || isalpha(eachcrossword[startRow + k][y]) || isalpha(eachcrossword[startRow + k][j])) {
                valid = 0;
                return valid;
            }
            else {
                if (k === 0 && startRow > 0) {
                    if (isalpha(eachcrossword[startRow - 1][j])) {
                        valid = 0;
                        return valid;
                    }
                }
                else if ((k === (word.length - 1)) && ((startRow + k) < 14)) {
                    if (isalpha(eachcrossword[startRow + word.length][j])) {
                        valid = 0;
                        return valid;
                    }
                }
            }
        }
        else if (startRow === i && startRow !== 0 && k === 0) {
            if (isalpha(eachcrossword[startRow - 1][j])) {
                valid = 0;
                return valid;
            }
        }
        else if ((startRow + word.length - 1) === i && startRow < 14 && k === (word.length - 1)) {
            if (isalpha(eachcrossword[startRow + word.length][j])) {
                valid = 0;
                return valid;
            }
        }
        k++;
    }
    location[0] = startRow;
    location[1] = j;
    location[2] = 0;
    return valid;
}

function locateVertical(word, eachcrossword, location) {
    let i = 0, j, k, m, startRow;
    while (i < 15) {
        for (j = 0; j < 15; j++) {
            for (k = 0; k < word.length; k++) {
                if (eachcrossword[i][j] === word[k]) {
                    startRow = i - k;
                    if ((startRow >= 0) && ((word.length + startRow) < 14)) {
                        if (validVertical(i, j, startRow, eachcrossword, location, word)) {
                            for (m = 0; m < word.length; m++) {
                                eachcrossword[startRow + m][j] = word[m];
                            }
                            return 1;
                        }
                    }
                    else {
                        break;
                    }
                }
            }
        }
        i++;
    }
    return 0;
}

function validHorizontal(i, j, startColumn, eachcrossword, location, word) {
    let k, x, y, valid = 1;
    x = i - 1;
    y = i + 1;
    k = 0;
    while (k < word.length) {
        if ((k + startColumn) !== j) {
            if (isalpha(eachcrossword[x][startColumn + k]) || isalpha(eachcrossword[y][startColumn + k]) || isalpha(eachcrossword[i][startColumn + k])) {
                valid = 0;
                return valid;
            }
            else {
                if (k === 0 && startColumn > 0) {
                    if (isalpha(eachcrossword[i][startColumn - 1])) {
                        valid = 0;
                        return valid;
                    }
                }
                else if ((k === (word.length - 1)) && ((startColumn + k) < 14)) {
                    if (isalpha(eachcrossword[i][startColumn + k + 1])) {
                        valid = 0;
                        return valid;
                    }
                }
            }
        }
        else if (startColumn === j && startColumn > 0 && k === 0) {
            if (isalpha(eachcrossword[i][startColumn - 1])) {
                valid = 0;
                return valid;
            }
        }
        else if ((startColumn + word.length) === j && startColumn < 14 && k === (word.length - 1)) {
            if (isalpha(eachcrossword[i][startColumn + k + 1])) {
                valid = 0;
                return valid;
            }
        }
        k++;
    }
    location[0] = i;
    location[1] = startColumn;
    location[2] = 1;
    return valid;
}

function locateHorizontal(word, eachcrossword, location) {
    let i, j, k, m, startColumn;
    i = 0;
    while (i < 15) {
        for (j = 0; j < 15; j++) {
            for (k = 0; k < word.length; k++) {
                if (eachcrossword[i][j] === word[k]) {
                    startColumn = j - k;
                    if ((startColumn >= 0) && ((word.length + startColumn) < 15)) {
                        if (validHorizontal(i, j, startColumn, eachcrossword, location, word)) {
                            for (m = 0; m < word.length; m++) {
                                eachcrossword[i][startColumn + m] = word[m];
                            }
                            return 1;
                        }
                    }
                    else {
                        break;
                    }
                }
            }
        }
        i++;
    }
    return 0;
}

function anagram(n, words, location) {
    let i, k, randomized;
    k = 0;
    let scramble, copy;
    console.log("\nClues:\n");
    i = 0;
    while (i < n) {
        if (location[i][0] !== -1) {
            scramble = words[i];
            copy = words[i];
            k = 0;
            while (k < scramble.length) {
                randomized = Math.floor(Math.random() * scramble.length);
                if (copy[randomized] === '.') {
                    continue;
                } else {
                    scramble[k] = copy[randomized];
                    copy[randomized] = '.';
                    k++;
                }
            }
            if (location[i][1] >= 0 && location[i][1] < 15 && location[i][0] >= 0 && location[i][0] < 15) {
                if (location[i][2] === 0) {
                    console.log(`${location[i][1]},${location[i][0]} Down   ${scramble}`);
                } else {
                    console.log(`${location[i][1]},${location[i][0]} Across ${scramble}`);
                }
            }
        }
        i++;
    }
    console.log("\n");
}

function displayPuzzle(eachcrossword, puzzle) {
    console.log("\nCrossword Puzzle:\n");
    console.log("-");
    for (let i = 0; i < 15; i++) {
        console.log("-");
    }
    console.log("|\n");
    for (let i = 0; i < 15; i++) {
        console.log("|");
        for (let k = 0; k < 15; k++) {
            if (isalpha(eachcrossword[i][k])) {
                puzzle[i][k] = ' ';
            } else {
                puzzle[i][k] = '#';
            }
            console.log(puzzle[i][k]);
        }
        console.log("|\n");
    }
    console.log("-");
    for (let i = 0; i < 15; i++) {
        console.log("-");
    }
    console.log("-\n");
}



