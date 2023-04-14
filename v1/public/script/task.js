function toggleLineThrough(checkbox) {
  let p = checkbox.parentElement.parentElement.querySelector("p");
  if (checkbox.checked) {
    p.classList.add("task-done");
  } else {
    p.classList.remove("task-done");
  }
}
