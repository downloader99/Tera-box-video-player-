function isValidTeraBoxLink(url) {
    const regex = /^https:\/\/(www\.)?(terabox|1024terabox)\.com\/s\/[a-zA-Z0-9_-]+$/;
    return regex.test(url);
}

document.getElementById("playButton").addEventListener("click", function() {
    const linkInput = document.getElementById("teraboxLink").value;

    if (!isValidTeraBoxLink(linkInput)) {
        alert("Invalid TeraBox link! Please enter a correct link.");
        return;
    }

    console.log("Valid TeraBox link:", linkInput);
});
