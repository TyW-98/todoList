function toggleLineThrough(checkbox) {
  let span = checkbox.parentElement.parentElement.previousElementSibling.querySelector("span");
  let taskDate =
    checkbox.parentElement.parentElement.previousElementSibling.querySelector(".created-date");
  let form = checkbox.parentElement.closest("form");
  let originalDate = taskDate.dataset.originalDate;

  if (checkbox.checked) {
    span.classList.add("task-done");
    taskDate.innerHTML = "Task Completed.";
    form.submit();
  } else {
    span.classList.remove("task-done");
    taskDate.innerHTML = originalDate;
  }

}
