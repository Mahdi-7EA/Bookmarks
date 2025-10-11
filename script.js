const searchBar = document.getElementById('searchBar');
const categoryButtons = document.querySelectorAll('.category-btn');
const categories = document.querySelectorAll('.category');
const noResults = document.querySelector('.no-results');

// Search functionality
searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    let hasResults = false;

    categories.forEach(category => {
        const links = category.querySelectorAll('a');
        let categoryHasResults = false;

        links.forEach(link => {
            const text = link.textContent.toLowerCase();
            if (text.includes(query)) {
                link.parentElement.style.display = 'block';
                categoryHasResults = true;
                hasResults = true;
            } else {
                link.parentElement.style.display = 'none';
            }
        });

        category.style.display = categoryHasResults ? 'block' : 'none';
    });

    noResults.style.display = hasResults ? 'none' : 'block';
});

// Category filter functionality
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedCategory = button.dataset.category;

        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show/hide categories
        let hasResults = false;
        categories.forEach(category => {
            if (selectedCategory === 'all' || category.dataset.category === selectedCategory) {
                category.style.display = 'block';
                hasResults = true;
            } else {
                category.style.display = 'none';
            }
        });

        // Reset search bar and show all links in visible categories
        searchBar.value = '';
        categories.forEach(category => {
            if (category.style.display !== 'none') {
                category.querySelectorAll('li').forEach(li => {
                    li.style.display = 'block';
                });
            }
        });

        noResults.style.display = hasResults ? 'none' : 'block';
    });
});