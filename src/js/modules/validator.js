const messages = {
	required: "This is field required",
	regex: "Your value does not match the input mask",
};

let errors = [];

export function validator(rules = {}, form) {
	errors = [];
	if (!Object.keys(rules).length) return;
	// console.log(rules);
	Object.keys(rules).forEach((key) => { // key = email, phone, name etc.
		const field = form.querySelector(`[name="${key}"]`);
		rules[key].split("|").map((rule) => { // required|regex etc.
			const split = rule.split(":");
			// вызов функции
			eval(split[0])(
				key,
				field,
				split[1] ? split[1] : messages[split[0]],
				split[2] ? split[2] : messages[split[0]]
			);
		});
	});

	const combinedObject = errors.reduce((result, currentObject) => {
		Object.keys(currentObject).forEach((key) => {
			if (result.hasOwnProperty(key)) {
				result[key].push(currentObject[key]);
			} else {
				result[key] = [currentObject[key]];
			}
		});
		return result;
	}, {});
	console.log(combinedObject);
	return combinedObject;
}

function required(key, field, message) {
	// field.parentElement.querySelector('small') ? field.parentElement.querySelector('small').remove() : null;
	if (
		field.value.length === 0 ||
		field.value === "" ||
		field.value === null ||
		field.value === undefined
	) {
		errors.push({ [key]: message });
		createErrorElement(field, message)
	}
	field.addEventListener("input", (e) => {
		if (e.target.value.length) {
			field.parentElement.querySelector('small') ? field.parentElement.querySelector('small').remove() : null;
		}else{
			!field.parentElement.querySelector('small') ? createErrorElement(field, message) : null
		}
	})
}

function checked(key, field, message) {
	field.parentElement.querySelector('small') ? field.parentElement.querySelector('small').remove() : null;
	if (!field.checked) {
		errors.push({ [key]: message });
		createErrorElement(field.parentElement.querySelector('div'), message)
	}
	field.addEventListener("change", (e) => {
		if (e.target.checked) {
			field.parentElement.querySelector('small') ? field.parentElement.querySelector('small').remove() : null;
		}else{
			field.parentElement.querySelector('small') ? createErrorElement(field.parentElement.querySelector('div'), message) : null
		}
	})
}

function regex(key, field, regex, message) {
	// field.parentElement.querySelector('small') ? field.parentElement.querySelector('small').remove() : null;
	const mod = /[g|i|m]{1,3}$/;
	let flag = regex.match(mod);
	flag = flag ? flag[0] : "";
	regex = regex.replace(mod, "").slice(1, -1);
	regex = new RegExp(regex, flag);
	if (!regex.test(field.value)) {
		errors.push({ [key]: message });
		createErrorElement(field, message)
	}
	field.addEventListener("blur", (e) => {
		if (regex.test(e.target.value)) {
			field.parentElement.querySelector('small') ? field.parentElement.querySelector('small').remove() : null;
		}else{
			field.parentElement.querySelector('small') ? createErrorElement(field.parentElement.querySelector('div'), message) : null
		}
	})
}

function createErrorElement(field, message){
	let element = document.createElement('small');
	element.style.color = 'red';
	element.style.fontSize = '11px';
	element.innerText = message;
	field.insertAdjacentElement('afterend', element)
}