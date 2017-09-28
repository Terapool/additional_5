module.exports = function check(str, bracketsConfig) {
  function Sequence(endKey, parent) { // Constructor for a sequence
        this.endKey = endKey;
        this.parent = parent;
    }
    var seqRow = []; // All the sequences are pushed into this array
    seqRow[0] = {}; // Base state without opened sequences
    var currentSeq = 0; // Index for seqRow array
    for (var i = 0; i < str.length; i++) {
        var keyFounded = false;
        for (var j = 0; j < bracketsConfig.length; j++) {
            if (str[i] == seqRow[currentSeq].endKey) {// special case: opening and closing bracket can be the same :)
                break
            }
            if (str[i] == bracketsConfig[j][0]) { // Creates new sequence for current i
                seqRow.push(new Sequence(bracketsConfig[j][1], currentSeq));
                currentSeq = seqRow.length - 1;
                keyFounded = true;
                break;
            }
        }
        if (!keyFounded) {
            if (str[i] == seqRow[currentSeq].endKey) {// Closes current sequence
                currentSeq = seqRow[currentSeq].parent;
                keyFounded = true;
            }
        }
        if (!keyFounded) {
            return false
        }
    }
    if (currentSeq == 0) { // All the sequences are closed
        return true
    } else {
        return false
    }
}
