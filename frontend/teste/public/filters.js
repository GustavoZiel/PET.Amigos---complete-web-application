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
            <span class="font-btn-filter">
                <i class="bi bi-x font-btn-filter btn-filter-close" onclick="removeActiveFilter(this)"></i> ${filterText}
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

function removeActiveFilter(iconElement) {
    const button = iconElement.closest('.btn-filter');
    const filterText = button.textContent.trim();

    const filterButtons = document.querySelectorAll('.btn-outline-purple');
    filterButtons.forEach(filterButton => {
        if (filterButton.textContent.trim() === filterText)
            filterButton.classList.remove('active');
    });
    button.parentElement.removeChild(button);
}