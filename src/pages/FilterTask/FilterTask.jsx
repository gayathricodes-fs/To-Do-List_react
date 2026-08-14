import './FilterTask.css';
import { FiSearch } from "react-icons/fi";
function FilterTask({activeFilter,setActiveFilterTask,setSearchTerm,searchTerm,setActiveFilter}) {
    return (
        <>
            <section className="filter-section">
                <div className="filter-task-container ">
                   <div className="filter-buttons">

      <button
        className={activeFilter === "all" ? "active" : ""}
        onClick={() => setActiveFilterTask("all")}
      >
        All
      </button>

      <button
        className={activeFilter === "active" ? "active" : ""}
        onClick={() => setActiveFilterTask("active")}
      >
        Active
      </button>

      <button
        className={activeFilter === "completed" ? "active" : ""}
        onClick={() => setActiveFilterTask("completed")}
      >
        Completed
      </button>

    </div>
                    
                    

                    <div className="search-container">

        <FiSearch className="search-icon" />

        <input
          type="text"
          className='searchbar'
           placeholder='Search tasks' 
          value={searchTerm}
          onChange={(event)=>setSearchTerm(event.target.value)}
        />

      </div>
                    
                </div>
            </section>
        </>
    )
}
export default FilterTask