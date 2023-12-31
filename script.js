var boton = document.getElementById("button_camara")

boton.onclick = function(e) {
		/*const $resultados = document.querySelector("#resultado");*/
    	var input_matricula = document.querySelector("#matricula_resultado");
		Quagga.init({
			inputStream: {
				constraints: {
					width: 1080,
					height: 1920,
				},
				name: "Live",
				type: "LiveStream",
				target: document.querySelector('#camara'), // Pasar el elemento del DOM
			},
			decoder: {
				readers: ["code_39_reader"]
			}
		}, function (err) {
			if (err) {
				console.log(err);
				return
			}
			console.log("Iniciado correctamente");
			Quagga.start();
		});

		Quagga.onDetected((data) => {
			input_matricula = document.getElementById("matricula_resultado");
			input_matricula.value = data.codeResult.code;
			// Imprimimos todo el data para que puedas depurar
			console.log(data);
		});



		Quagga.onProcessed(function (result) {
		var drawingCtx = Quagga.canvas.ctx.overlay,
			drawingCanvas = Quagga.canvas.dom.overlay;

		if (result) {
			if (result.boxes) {
				drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
				result.boxes.filter(function (box) {
					return box !== result.box;
				}).forEach(function (box) {
					Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
				});
			}

			if (result.box) {
				Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
			}

			if (result.codeResult && result.codeResult.code) {
				Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
			}
		}
		});
}