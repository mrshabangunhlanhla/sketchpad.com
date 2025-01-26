class SketchPad  {
	constructor() {
		this.canvas = document.getElementById("gameCanvas");
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.tools = [new Pen()];
		this.pos= [-1, -1];
		this.isDrawing = false;
		this.__paths = []
		this.ctx = this.canvas.getContext('2d');
		
		this.__init__();
	}
	__init__() {
		const screen = document.getElementById("screen");
		const newfilebtn = document.getElementById("newfilebtn");
		const openfilebtn = document.getElementById("openfilebtn");
		const storelist = document.getElementById("storelist");
		const filelist = document.getElementById("filelist");
		const filename = document.getElementById("filename")
		const colorbtn = document.getElementById("colorbtn");
		const sizebtn = document.getElementById("sizebtn");
		const undobtn = document.getElementById("undobtn");

		
		newfilebtn.addEventListener("click", ev => {
			this.#clear();
			
			// console.log()
			
		})
		
		openfilebtn.addEventListener("click", ev => {
			filelist.innerHTML = '';
			const isListHidden = filelist.style.display!=="block" ?true:false;
			filelist.style.display = isListHidden?"block": "none";
			this.#getFiles().forEach( file => {
				const li = document.createElement("li");
				li.innerText = file.name;
				li.setAttribute("id", file.id)
				li.onclick = this.#load;
				filelist.appendChild(li);
				
				
			})
			
			// console.log()
			
		})
		savefilebtn.addEventListener("click", ev => {
			this.#save(filename.value, this.__paths);
			
			// console.log()
			
		})
		
		screen.addEventListener("pointercancel", ev => {
			this.isDrawing = false;
			// console.log("pointercancel");
			// console.log("Not Drawing");
			
		})
		screen.addEventListener("pointerdown", ev => {
			this.isDrawing = true;
			this.#getPos(ev);
			const path = {
				color: this.tools[0].color,
				size: this.tools[0].size,
				points: [this.pos]
			};
			this.__paths.push(path);
			
			// console.log("Drawing");
		})
		screen.addEventListener("pointerup", ev => {
			this.isDrawing = false;
			this.#getPos(ev);
			// console.log("Not Drawing");
			
			
		})
		screen.addEventListener("pointermove", ev => {
			this.#getPos(ev);
			if(this.isDrawing){
				// console.log("Drawing");
				const lastPath = this.__paths[this.__paths.length-1];
				
				lastPath.points.push(this.pos);
				
			}
			
			// this.update();
		
		})
		
		colorbtn.addEventListener("input", ev => {
			this.tools.forEach( tool => {
				tool.color = ev.target.value;
			}) 
			// console.log()
			
		})
		sizebtn.addEventListener("input", ev => {
			this.tools.forEach( tool => {
				tool.size = ev.target.value>=1?ev.target.value:1;
			})
			
		})
		
		undobtn.addEventListener("click", ev => {
			
			this.__paths.pop();
			
			
		})
	
	}

	update() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.tools[0].drawPaths(this.ctx, this.__paths);
		if(this.__paths.length>0) {
			undobtn.disabled = false;
			filename.disabled = false;
			newfilebtn.disabled = false;
			savefilebtn.disabled = false;
			
		}else {
			undobtn.disabled = true;
			filename.disabled = true;
			newfilebtn.disabled = true;
			savefilebtn.disabled = true;
		}
	}
	
	#getFiles() {
		return JSON.parse(localStorage.getItem("__stores")) || [];	
	}
	
	#getFile(id) {
		const stores = this.#getFiles();
		// console.log(stores.find(c => c.id==id))
		return stores.find(c => c.id==id);
		
	}
	
	#load =(ev) => {
		const file = this.#getFile(ev.target.id);
		// console.log(ev.target);
		const {name, paths} = file;
		filename.value = name;
		this.__paths = [...paths];
		// openfilebtn.click();
	}
	#save(name, paths) {
		const files = this.#getFiles();
		// const found = files.find( file => file.name==name);
		// if(found) throw({error: "Invalid Name", msg: "Name of the file is invalid"})
		const date = new Date().toLocaleString();
		const file = {
			id: files.length,
			name: name,
			created: date,
			modified: date,
			paths
		};
		files.push(file);
		
		const fileString = JSON.stringify([...files]);
		localStorage.setItem("__stores", fileString);
		// const jsonLink = document.createElement("a");
		// jsonLink.setAttribute("href", `data:text/plain;charset=utf-8, ${encodeURIComponent(fileString)}`)
		// jsonLink.setAttribute("download", `${new Date().getTime()}.json`)
		// jsonLink.click();
		// console.log("Saved", );
	}
	
	#clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.__paths = [];
		filename.value = "untitled";
		// console.log("Cleared")
		
	}
	#getPos(ev) {
		const rect = this.canvas.getBoundingClientRect();
		const x =  ev.x-rect.left;
		const y =  ev.y-rect.top;
		this.pos = [x, y];
	}
	
	
	
	
}
