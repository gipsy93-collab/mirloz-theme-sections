class MirlozFanzine {
  constructor(container) {
    this.container = container;
    this.slides = container.querySelectorAll('.fanzine-page-slide');
    this.prevBtn = container.querySelector('.fanzine-prev-btn');
    this.nextBtn = container.querySelector('.fanzine-next-btn');
    this.pageNumIndicators = container.querySelectorAll('.current-page-num-indicator, .current-page-num-label, .current-page-num-counter');

    this.currentPage = 0;
    this.totalPages = this.slides.length;

    if (this.totalPages === 0) return;

    this.prevBtn.addEventListener('click', () => this.navigate(-1));
    this.nextBtn.addEventListener('click', () => this.navigate(1));
    this.update();
  }

  navigate(direction) {
    const next = this.currentPage + direction;
    if (next < 0 || next >= this.totalPages) return;
    this.currentPage = next;
    this.update();
  }

  update() {
    this.slides.forEach((slide, idx) => {
      if (idx === this.currentPage) {
        slide.classList.remove('opacity-0', 'pointer-events-none');
        slide.classList.add('opacity-100', 'pointer-events-auto', 'active-slide');
      } else {
        slide.classList.remove('opacity-100', 'pointer-events-auto', 'active-slide');
        slide.classList.add('opacity-0', 'pointer-events-none');
      }
    });

    const isFirst = this.currentPage === 0;
    const isLast = this.currentPage === this.totalPages - 1;

    this.prevBtn.disabled = isFirst;
    this.prevBtn.classList.toggle('opacity-30', isFirst);
    this.nextBtn.disabled = isLast;
    this.nextBtn.classList.toggle('opacity-30', isLast);

    const displayPage = this.currentPage + 1;
    this.pageNumIndicators.forEach(el => {
      el.textContent = displayPage;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.mirloz-fanzine-root').forEach(el => {
    new MirlozFanzine(el);
  });
});

if (typeof Shopify !== 'undefined' && Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    event.target.querySelectorAll('.mirloz-fanzine-root').forEach(el => {
      new MirlozFanzine(el);
    });
  });
}
