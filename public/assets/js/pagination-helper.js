/**
 * Pagination Helper - Reusable pagination functions with dynamic IDs
 * 
 * Usage:
 * const paginationHelper = new PaginationHelper('ibpr');
 * paginationHelper.render(paginationData);
 */

class PaginationHelper {
    constructor(paginationId = 'pagination') {
        this.paginationId = paginationId;
        this.paginationContainer = document.getElementById(paginationId);
        this.paginationFrom = document.getElementById(`${paginationId}-from`);
        this.paginationTo = document.getElementById(`${paginationId}-to`);
        this.paginationTotal = document.getElementById(`${paginationId}-total`);
        this.paginationNumbers = document.getElementById(`${paginationId}-numbers`);
        this.prevMobile = document.getElementById(`${paginationId}-prev-mobile`);
        this.nextMobile = document.getElementById(`${paginationId}-next-mobile`);
        this.prevDesktop = document.getElementById(`${paginationId}-prev-desktop`);
        this.nextDesktop = document.getElementById(`${paginationId}-next-desktop`);
    }

    /**
     * Render pagination with data
     * @param {Object} paginationData - Pagination data from Laravel
     * @param {Function} onPageChange - Callback function when page changes
     */
    render(paginationData, onPageChange = null) {
        if (paginationData.total > 0) {
            this.paginationContainer.classList.remove('hidden');

            this.paginationFrom.textContent = paginationData.from || 0;
            this.paginationTo.textContent = paginationData.to || 0;
            this.paginationTotal.textContent = paginationData.total;

            this.paginationNumbers.innerHTML = '';

            paginationData.links.forEach(link => {
                if (link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;') {
                    const pageButton = document.createElement('button');
                    pageButton.className = `relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        link.active
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`;
                    pageButton.innerHTML = link.label;
                    pageButton.disabled = !link.url;

                    if (link.url && onPageChange) {
                        pageButton.addEventListener('click', () => {
                            onPageChange(link.page);
                        });
                    }

                    this.paginationNumbers.appendChild(pageButton);
                }
            });

            this.updateNavigationButtons(paginationData, onPageChange);
        } else {
            this.paginationContainer.classList.add('hidden');
        }
    }

    /**
     * Update navigation buttons (prev/next)
     * @param {Object} paginationData - Pagination data from Laravel
     * @param {Function} onPageChange - Callback function when page changes
     */
    updateNavigationButtons(paginationData, onPageChange = null) {
        this.prevMobile.disabled = !paginationData.prev_page_url;
        this.nextMobile.disabled = !paginationData.next_page_url;
        this.prevDesktop.disabled = !paginationData.prev_page_url;
        this.nextDesktop.disabled = !paginationData.next_page_url;

        if (onPageChange) {
            this.prevMobile.onclick = () => {
                if (paginationData.prev_page_url) {
                    onPageChange(paginationData.current_page - 1);
                }
            };

            this.nextMobile.onclick = () => {
                if (paginationData.next_page_url) {
                    onPageChange(paginationData.current_page + 1);
                }
            };

            this.prevDesktop.onclick = () => {
                if (paginationData.prev_page_url) {
                    onPageChange(paginationData.current_page - 1);
                }
            };

            this.nextDesktop.onclick = () => {
                if (paginationData.next_page_url) {
                    onPageChange(paginationData.current_page + 1);
                }
            };
        }
    }

    /**
     * Hide pagination
     */
    hide() {
        this.paginationContainer.classList.add('hidden');
    }

    /**
     * Show pagination
     */
    show() {
        this.paginationContainer.classList.remove('hidden');
    }

    /**
     * Reset pagination
     */
    reset() {
        this.paginationFrom.textContent = '0';
        this.paginationTo.textContent = '0';
        this.paginationTotal.textContent = '0';
        this.paginationNumbers.innerHTML = '';
        this.hide();
    }
}

