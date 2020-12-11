const abobe = {
    container: document.querySelector('#app'),
    canvas: document.querySelector('#canv'),
    tools: document.querySelector('#tools'),
    x: 0,
    y: 0,
    context: null,
    editor: {
        currentTool: null,
        currentColor: '000',
        currentBrushSize: 10
    },
    
    init(){
       this.context = this.canvas.getContext('2d');
       this._handleEvents();
    },
    _handleEvents(){
        this.canvas.addEventListener('mousemove',this._moveHendler.bind(this));
        this.canvas.addEventListener('mousedown',this._startProcess.bind(this));
        document.addEventListener('mouseup',this._endProcess.bind(this));
        this.tools.addEventListener('click', this._clickHendler.bind(this));
        this.tools.addEventListener('change', this._changeHendler.bind(this))
    },
    _moveHendler(e) {
        this.x = e.offsetX;
        this.y = e.offsetY;
        this._renderCoordinates();
       
    },
    _renderCoordinates(){
         document.querySelector('#xCoord').innerText = this.x;
        document.querySelector('#yCoord').innerText = this.y;
    },
    
    _clickHendler(e){
        if(e.target.name === 'tool') {
            this.editor.currentTool = e.target.dataset.tool;
        }
        if(e.target.id === 'save-img') {
            this._save();
        }
    },
    
    _changeHendler(e) {
        if(e.target.name === 'tool-input') {
            this.editor[`current${e.target.dataset.tool}`] = e.target.value;
        }
    },
    
    _startProcess(e){
        this.context.fillStyle = this.editor.currentColor;
        this.context.strokeStyle = this.editor.currentColor;
       let size = this.editor.currentBrushSize;
       
        this.canvas.onmousemove = () => {
            this._square(size); 
        }
    },
        
    _endProcess() {
        this.canvas.onmousemove = null;
    },
    
    _pencil(size) {
        this.context.fillRect(this.x,this.y, size, size);

    },    
    _eraser(size) {
        this.context.clearRect(this.x, this.y, size, size);
    },
    
    _fill() {
        this.context.fillRect(0,0,this.canvas.width, this.canvas.height);
    },
    
    _clearCnv() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    },
    
    _square(size) {
        this.context.strokeRect(this.x, this.y, size, size);
    },
    _save() {
        let newImg = new Image();
        newImg.src = this.canvas.toDateURL();
        
        let a = document.createElement('a');
        a.setAttribute('href', newImg.src);
        a.setAttribute('download', 'img_');
        
        a.click();
    }
    
}

abobe.init();