module.exports = class ContextBinder {
  constructor (context_functions) {
    this._context_functions = context_functions;
    this.bindContext = this.bindContext.bind(this);
  
    this.bindContext(this);
  }

  bindContext (context) {
    Object.keys(this._context_functions).forEach(function_name => {
      context = this.context_functions[function_name].bind(context);
    });
  }
};