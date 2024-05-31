var firebaseConfig = {
    apiKey: "AIzaSyAQTSVm6Mw3IIKJKNfbBe_4kuNJcVXbU1M",
    authDomain: "facebook-postpage.firebaseapp.com",
    projectId: "facebook-postpage",
    storageBucket: "facebook-postpage.appspot.com",
    messagingSenderId: "698269205009",
    appId: "1:698269205009:web:12666f59ecc49f2cf827b0"
};

firebase.initializeApp(firebaseConfig);

var commentsRef = firebase.database().ref('comments');
var likesRef = firebase.database().ref('likes');

var likesRef = firebase.database().ref('love');

document.getElementById('add-comment').addEventListener('click', postComment);
document.getElementById('like-button').addEventListener('click', incrementLike);
document.getElementById('love-button').addEventListener('click', incrementLike);

function postComment() {
    var commentInput = document.getElementById('comment-input').value;
    var newCommentRef = commentsRef.push();
    newCommentRef.set({
        text: commentInput,
        timestamp: Date.now()
    });
    document.getElementById('comment-input').value = '';
}


commentsRef.on('child_added', function(data) {
    var comment = data.val();
    addCommentToUI(comment.text);
});

function addCommentToUI(comment) {
    var commentsDiv = document.getElementById('comments');
    var commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    commentDiv.innerText = comment;
    commentsDiv.appendChild(commentDiv);
}

function incrementLike() {
    likesRef.transaction(function(currentLikes) {
        return (currentLikes || 0) + 1;
    });
}

likesRef.on('value', function(snapshot) {
    var likeCount = snapshot.val();
    document.getElementById('like-count').innerText = likeCount || 0;
});

