const likeBtn = document.getElementById("btn-like");
const deleteBtn = document.getElementById("btn-delete");

$("#post-comment-form").hide();
$("#btn-toggle-comments").click(e=>{
  e.preventDefault();
  $("#post-comment-form").slideToggle();
});

likeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const uniqueId = likeBtn.dataset.id;
  $.post(`/images/${uniqueId}/like`).done((data) => {
    $(".likes-count").text(data.likes);
  });
});

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const userResponse = confirm("Are you sure you want to delete this image?");
  if (!userResponse) return;
  const uniqueId = deleteBtn.dataset.id;
  $.ajax({
    url: `/images/${uniqueId}`,
    type: "DELETE",
  })
    .done(() => {
      deleteBtn.className = "btn btn-success";
      deleteBtn.innerHTML = '<i class="fa fa-check"></i> Deleted!';
    })
    .fail(({ status }) => {
      const message =
        status === 500
          ? "Image was not deleted due to an internal server error"
          : "Image was previosly deleted or does not exit";
      alert(message);
    });
});
