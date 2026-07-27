import './FilterTask.css';
function FilterTask() {
    return (
        <>
            <section className="filter-section">
                <div className="filter-task-container ">
                    <div className='filterTasks'>
                        <button className="btn filter-btn" type="button">
                            All
                        </button>
                        <button className="btn filter-btn" type="button">
                            Active
                        </button>
                        <button className="btn filter-btn" type="button">
                            Completed
                        </button>
                    </div>
                    
                    <div className='searchTasks'>
                        <input className='searchbar form-control' placeholder='Search tasks'/>
                    </div>
                    
                </div>
            </section>
        </>
    )
}
export default FilterTask