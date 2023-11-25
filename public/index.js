var quill;
quill = new Quill(document.querySelector(".quill-editor"), {
  theme: "snow",
});
const babForm = document.getElementById("babForm");
function onSubmitBtn() {
  // Store the collected "Bab" data in the hidden input field
  document.getElementById("content").value =
    document.querySelector(".quill-editor").children[0].innerHTML;

  babForm.submit();
}
