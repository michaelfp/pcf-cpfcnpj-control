import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { string } from "prop-types";
import {CPFCNPJValidator, CPFCNPJType} from './CPFCNPJValidator';



export class CPFCNPJ implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	_divControl:HTMLDivElement;
	_inputControl: HTMLInputElement;
	_notifyOutputChanged: () => void;
	_container: HTMLDivElement;
	_spanControl: HTMLSpanElement;
	_iconControl: HTMLElement;
	_context: ComponentFramework.Context<IInputs>;
	_campoFormatado: boolean;
	_type:CPFCNPJType;
	_CPF_CNPJ: string;

	_refreshData: EventListenerOrEventListenerObject;

	_validador = new CPFCNPJValidator();

	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Get UniqueId so as to avoid id conflict between multiple fields bind to same attribute
	 * @param context The "Input Properties" containing the parameters, control metadata and interface functions.
	 * @param passInString input string as suffix
	 * @param randomInt random integer
	 * @returns a string of uniqueId includes attribute logicalname + passIn specialized string + random Integer
	*/
	private createUniqueId(context: ComponentFramework.Context<IInputs>, passInString: string): string {
		let randomInt = Math.floor(Math.floor(100) * Math.random());
		return context.parameters!.CFPCNPJValue.attributes!.LogicalName + "-" + passInString + randomInt;
	}

	renderControl(container:HTMLDivElement): void{

		this._container = document.createElement("div");
		this._inputControl = document.createElement("input");
		this._inputControl.setAttribute("id",this.createUniqueId(this._context,"cpfcnpj_control"));
		this._inputControl.setAttribute("value",this._context.parameters.CFPCNPJValue.formatted ? this._context.parameters.CFPCNPJValue.formatted : "");
		this._inputControl.addEventListener("input",this._refreshData);
		this._spanControl = document.createElement("span");
		this._iconControl = document.createElement("i");
		this._iconControl.classList.add("fas");
		
		this._spanControl.appendChild(this._iconControl);

		this._container.appendChild(this._inputControl);
		this._container.appendChild(this._spanControl);
		container.appendChild(this._container);

	}

	refreshData(evt: Event):void{
		this._CPF_CNPJ = this._inputControl.value;
		
		if(this._CPF_CNPJ === "" || this._CPF_CNPJ === undefined)
		{
			this._iconControl.classList.remove("control-valid");
			this._iconControl.classList.remove("fa-check-circle");
			this._iconControl.classList.remove("fa-times-circle");
			this._iconControl.classList.remove("control-invalid");
			
		}
		else
			this.validateField();
		
			
		this._notifyOutputChanged();
	}
	
	validateField():void
	{
		if(this._type === CPFCNPJType.CPF && (this._CPF_CNPJ !== "" && this._CPF_CNPJ !== undefined))
		{
			if(this._validador.isCPF(this._CPF_CNPJ)  && this._validador.validaCPF(this._CPF_CNPJ))
			{
				console.log('CPF Válido');
				this._iconControl.classList.remove("control-invalid");
				this._iconControl.classList.remove("fa-times-circle");
				this._iconControl.classList.add("fa-check-circle");

				this._iconControl.classList.add("control-valid");
				if(this._campoFormatado)
				{
					this._CPF_CNPJ = this._validador.formataCPF(this._CPF_CNPJ);
					//this._inputControl.setAttribute("value",this._CPF_CNPJ);
					this._inputControl.value = this._CPF_CNPJ;
				}

				this._inputControl.setAttribute("value",this._CPF_CNPJ);
			}
			else
			{
				this._CPF_CNPJ = "";
				console.log('CPF Inválido');
				this._iconControl.classList.remove("control-valid");
				this._iconControl.classList.remove("fa-check-circle");
				this._iconControl.classList.add("fa-times-circle");
				this._iconControl.classList.add("control-invalid");
			}
		}
		

		if(this._type === CPFCNPJType.CNPJ && (this._CPF_CNPJ !== "" && this._CPF_CNPJ !== undefined))
		{
			if(this._validador.isCNPJ(this._CPF_CNPJ)  && this._validador.validaCNPJ(this._CPF_CNPJ))
			{
				console.log('CNPJ Válido');
				this._iconControl.classList.remove("control-invalid");
				this._iconControl.classList.remove("fa-times-circle");
				this._iconControl.classList.add("fa-check-circle");
				this._iconControl.classList.add("control-valid");
				if(this._campoFormatado)
				{
					this._CPF_CNPJ = this._validador.formataCNPJ(this._CPF_CNPJ);
					this._inputControl.value = this._CPF_CNPJ;
				}
			}
			else{
				this._CPF_CNPJ = "";
				console.log('CNPJ Inválido');
				this._iconControl.classList.remove("control-valid");
				this._iconControl.classList.remove("fa-check-circle");
				this._iconControl.classList.add("fa-times-circle");
				this._iconControl.classList.add("control-invalid");
			}

		}
		
	}


	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='starndard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		// Add control initialization code

		this._container = document.createElement("div");
		this._context = context;
		this._refreshData = this.refreshData.bind(this);
		this._notifyOutputChanged = notifyOutputChanged;
		this._CPF_CNPJ = context.parameters.CFPCNPJValue.formatted? context.parameters.CFPCNPJValue.formatted : "";
		this._type = context.parameters.TipoControle.formatted === "CPF" ? CPFCNPJType.CPF : CPFCNPJType.CNPJ;
		this._campoFormatado = context.parameters.Formatado.formatted === "1" ? true : false;
		console.log(this._campoFormatado);
		console.log(this._type);
		// console.log(this._type);
		
		this.renderControl(container);
		if(this._CPF_CNPJ !== "" && this._CPF_CNPJ !== undefined)
			this.validateField();

	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
		this._CPF_CNPJ = context.parameters.CFPCNPJValue.raw ? context.parameters.CFPCNPJValue.raw  : "";
		this._type = context.parameters.TipoControle.raw === "CPF" ? CPFCNPJType.CPF : CPFCNPJType.CNPJ;
		this._campoFormatado =  context.parameters.Formatado.raw === "1" ? true : false;
		this._context = context;
		
		//this.validateField();
		
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			CFPCNPJValue: this._CPF_CNPJ
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
		this._inputControl.removeEventListener("input",this._refreshData);
	}
}