let flag = 0;
const button = document.getElementById('buttonSave');

async function saveData() {
    if (flag == 0) {
        const signoZ = document.getElementById('signoZ').value;
        const ego = document.getElementById('ego').value;
        const impulsivo = document.getElementById('impulsivo').value;
        const dinero = document.getElementById('dinero').value;
        const razon = document.getElementById('razon').value;

        if (signoZ != 0) {
            if (ego != 0) {
                if (impulsivo != 0) {
                    if (dinero != 0) {
                        if (razon != 0) {
                            deactive();
                            let response = await connect({
                                'signo': signoZ,
                                'genero': ego,
                                'edad': impulsivo,
                                'sueldo': dinero,
                                'parejas': razon
                            }, 'save', 'POST');

                            alertify.set('notifier', 'position', 'bottom-left');
                            // verificacion status
                            switch (response.status) {
                                case 200: {
                                    alertify.success('Se guardo correctamente.');
                                    alertify.success('Gracias por su participacion.');
                                    resetform();
                                    active();
                                }
                                    break;
                                case 201: {
                                    alertify.error('No se guardo los datos.');
                                    active();
                                }
                                    break;
                                default: {
                                    alertify.error('Error del sistema.');
                                    active();
                                }
                            }
                        } else {
                            alert("Elige una opción")
                        }
                    } else {
                        alert("Elige una opción")
                    }
                } else {
                    alert("Elige una opción");
                }
            } else {
                alert("Elige una opción");
            }
        } else {
            alert("Elige un mes por favor");
        }
    }
}

async function connect(data, context, method) {
    try {

        // declaracion de headers
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        // asignacion datos iniciales
        const dataInit = {
            method: method,
            headers,
            body: JSON.stringify(data),
        }

        // Recuperar URL
        const protocolo = window.location.href;

        // consulta con url
        let response = await fetch(`${protocolo}${context}`, dataInit);
        return response;
    } catch (e) {
        alert('Error en consulta');
        active();
        console.log(e);
    }
}

function active() {
    setTimeout(function () {
        button.style.opacity = '1';
        flag = 0;
    }, 3000)
}

function deactive() {
    button.style.opacity = '0.5';
    flag = 1;
}

function resetform() {
    document.getElementById('signoZ').value = 0;
    document.getElementById('ego').value = 0;
    document.getElementById('impulsivo').value = 0;
    document.getElementById('dinero').value = 0;
    document.getElementById('razon').value = 0;
}

async function charts() {
    const x = document.getElementById('x').value;
    const y = document.getElementById('y').value;
    const k = document.getElementById('Clusters').value;
    alertify.set('notifier', 'position', 'bottom-left');
    if (x == y) {
        alertify.warning("No se pueden seccionar 2 columnas iguales.")
    } else {
        deactive();
        let response = await connect({x: x, y: y, k: k}, '/chartDraw', 'POST');


        alertify.set('notifier', 'position', 'bottom-left');
        // verificacion status
        switch (response.status) {
            case 200: {;
                alertify.success('Graficado correcto.');
                active();
                let data = await response.json();
                drawChart(data);
            }
                break;
            case 201: {
                alertify.error('Sin datos');
                active();
            }
                break;
            default: {
                alertify.error('Error del sistema.');
                active();
            }
        }
    }
}

function drawChart(data){
    let chart = new CanvasJS.Chart("chartContainer", data);
    chart.render();
}

