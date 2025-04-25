$(document).ready(function () {
  const $form = $("#ticketForm");
  const $ticket = $("#ticketDisplay");
  const $fileInput = $("#fileinput");
  const $previewImage = $("#previewImage");
  const $uploadArea = $(".upload-area");

  // Form submission
  $form.on("submit", function (e) {
    e.preventDefault();

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const github = $("#github").val().trim();

    if (!name || !email || !github || !$fileInput[0].files.length) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    $("#nameShow").text(name);
    $("#emailShow").text(email);
    $("#ticketName").text(name);

    // Clear previous content and add GitHub username with icon
    $("#ticketGithub").empty(); // Clear any existing content
    const $githubText = $("<span>").text(github); // Username text
    const $githubIcon = $("<img>", {
      src: "assets/images/icon-github.svg",
      alt: "GitHub icon",
      class: "github-icon", // Optional: for styling
    });
    $("#ticketGithub").append($githubIcon, $githubText); // Add icon then text

    $form.fadeOut(300, function () {
      $ticket.fadeIn(300);
    });
  });

  // Trigger file input when clicking upload area
  $uploadArea.on("click", function (e) {
    if (e.target.tagName !== "IMG" && e.target.tagName !== "P") {
      $fileInput.trigger("click");
    }
  });

  // Image upload handling
  $fileInput.on("change", function (e) {
    const file = e.target.files[0];

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Please upload only JPG or PNG files.");
      $fileInput.val("");
      return;
    }

    if (file.size > 500 * 1024) {
      alert("File size must be less than 500KB.");
      $fileInput.val("");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      $previewImage.attr("src", e.target.result).show();
    };
    reader.onerror = function () {
      alert("Error reading the file. Please try again.");
    };
    reader.readAsDataURL(file);
  });

  // Drag and drop support
  $uploadArea.on("dragover", function (e) {
    e.preventDefault();
    $(this).addClass("dragover");
  });

  $uploadArea.on("dragleave", function () {
    $(this).removeClass("dragover");
  });

  $uploadArea.on("drop", function (e) {
    e.preventDefault();
    $(this).removeClass("dragover");
    $fileInput[0].files = e.originalEvent.dataTransfer.files;
    $fileInput.trigger("change");
  });
});
