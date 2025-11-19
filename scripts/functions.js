function togglePassword(id) {
  const input = document.getElementById(id);
  const openIcon = document.getElementById(`icon-${id}-open`);
  const closedIcon = document.getElementById(`icon-${id}-closed`);

  if (input.type === "password") {
    input.type = "text";
    openIcon.style.display = "none";
    closedIcon.style.display = "block";
  } else {
    input.type = "password";
    openIcon.style.display = "block";
    closedIcon.style.display = "none";
  }
}
