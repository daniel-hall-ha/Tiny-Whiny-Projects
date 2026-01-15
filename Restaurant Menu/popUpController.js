function close_modal() {
    const modal = document.getElementById("search-results-modal");
    const disabled = document.querySelector("div[style*='rgba(0, 0, 0, 0.5)']");
    modal.remove();
    disabled.remove();
    document.body.style.overflow = "initial"; // Re-enable scrolling

}
