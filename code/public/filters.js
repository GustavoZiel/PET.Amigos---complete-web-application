document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".btn-outline-purple").forEach(btn_filter => {
        btn_filter.addEventListener("click", function () {
            this.classList.toggle("active");

            if (this.classList.contains("active"))
                addFilterItem(this);
            else
                removeFilterItem(this);
        });
    });
});

function addFilterItem(button) {
    const filterText = button.textContent.trim();
    const activeFiltersContainer = document.getElementById('activeFilters');

    const filterButton = document.createElement('button');
    filterButton.type = 'button';
    filterButton.className = 'p-0 pe-2 btn me-3 btn-filter rounded-pill';
    filterButton.innerHTML = `
            <span class="d-flex align-items-center">
                <i class="bi font-btn-filter btn-filter-close"></i>
                <span class="font-btn-filter ms-2">${filterText}</span>
            </span>`;
    activeFiltersContainer.appendChild(filterButton);
}

function removeFilterItem(button) {
    const filterText = button.textContent.trim();
    const activeFiltersContainer = document.getElementById('activeFilters');
    const activeFilterButtons = activeFiltersContainer.querySelectorAll('.btn-filter');

    activeFilterButtons.forEach(activeButton => {
        if (activeButton.textContent.trim().includes(filterText))
            activeFiltersContainer.removeChild(activeButton);
    });
}