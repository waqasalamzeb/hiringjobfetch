function data(searchTerm = '') {
    const url = `https://backend-prod.app.hiringmine.com/api/jobAds/all?limit=40&pageNo=2&keyWord=${encodeURIComponent(searchTerm)}&category=`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const jobsList = document.querySelector("#job-listings");
            jobsList.innerHTML = ''; // Clear previous results
            const result = data.data;

            if (result.length === 0) {
                jobsList.innerHTML = '<p>No jobs found.</p>';
                return;
            }

            console.log(data);
            result.forEach(element => {
                const card = document.createElement('div');
                card.className = "col-md-6";

                const cardContent = `<div class="card">
                    <div class="card-body">
                        <div class="name">
                            <div class="username">${element.companyName}</div>
                            <img src="/images/M.png" alt="Company Logo">
                        </div>
                        <h5 class="card-title">${element.designation}</h5>
                        <p class="card-text" style='color: rgb(104, 81, 255); font-weight: 600;'>RS ${element.payRangeStart || 'not mention'}</p>
                        <p class="card-text" style='margin-top: 30px; font-weight: 600;'>Location: ${element.city || 'N/A'} ${element.country || 'N/A'}</p>
                        <div class="name">
                            <p class="time">${calculateTimeDifference(element.updatedAt)} ago</p>
                            <p class="views">${element.views} views</p>
                        </div>
                    </div>
                </div>`;
                card.innerHTML = cardContent;
                jobsList.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching job data:', error);
            const jobsList = document.querySelector("#job-listings");
            jobsList.innerHTML = '<p>Error fetching job data. Please try again later.</p>';
        });
}

function calculateTimeDifference(updatedAt) {
    const updatedAtDate = new Date(updatedAt);
    const now = new Date();
    const timeDifference = now - updatedAtDate;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

    if (hoursDifference >= 24) {
        const daysDifference = Math.floor(hoursDifference / 24);
        return `${daysDifference} day${daysDifference > 1 ? 's' : ''}`;
    }

    return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', () => {
        const searchInput = document.querySelector('.search-input').value;
        data(searchInput);
    });

    data(); // Load initial data without any search term
});

function filterJobsByType(jobs, jobType) {
    return jobs.filter(job => job.type.toLowerCase() === jobType.toLowerCase());
  }
  
  // Example usage
  const jobTypeToFilter = 'Full Time';
 data(jobTypeToFilter);






 