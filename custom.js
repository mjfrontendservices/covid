let net = new brain.NeuralNetwork();

let dataholder;
let training_data = [];
let checked = [];

$.getJSON('./training_data/covid_symtoms.json', function (data) {
    dataholder = data;
    dataholder.forEach(element => {
        let bp;
        let f;
        let dc;
        let st;
        let rn;
        let asm;
        let cld
        let hache
        let hdes;
        let dbts;
        let hpt
        let ftg;
        let gas;
        let at;
        let ccp
        let alg;
        let vpep;
        let fwipep;
        let wm;
        let sfm;
        let cov;
        element['Breathing Problem'] === "Yes" ? bp = 1 : bp = 0;
        element['Fever'] === "Yes" ? f = 1 : f = 0;
        element['Dry Cough'] === "Yes" ? dc = 1 : dc = 0;
        element['Sore throat'] === "Yes" ? st = 1 : st = 0;
        element['Running Nose'] === "Yes" ? rn = 1 : rn = 0;
        element['Asthma'] === "Yes" ? asm = 1 : asm = 0;
        element['Chronic Lung Disease'] === "Yes" ? cld = 1 : cld = 0;
        element['Headache'] === "Yes" ? hache = 1 : hache = 0;
        element['Heart Disease'] === "Yes" ? hdes = 1 : hdes = 0;
        element['Diabetes'] === "Yes" ? dbts = 1 : dbts = 0;
        element['Hyper Tension'] === "Yes" ? hpt = 1 : hpt = 0;
        element['Fatigue'] === "Yes" ? ftg = 1 : ftg = 0;
        element['Gastrointestinal'] === "Yes" ? gas = 1 : gas = 0;
        element['Abroad travel'] === "Yes" ? at = 1 : at = 0;
        element['Contact with COVID Patient'] === "Yes" ? ccp = 1 : ccp = 0;
        element['Attended Large Gathering'] === "Yes" ? alg = 1 : alg = 0;
        element['Visited Public Exposed Places'] === "Yes" ? vpep = 1 : vpep = 0;
        element['Family working in Public Exposed Places'] === "Yes" ? fwipep = 1 : fwipep = 0;
        element['Wearing Masks'] === "Yes" ? wm = 1 : wm = 0;
        element['Sanitization from Market'] === "Yes" ? sfm = 1 : sfm = 0;
        element['COVID-19'] === "Yes" ? cov = 1 : cov = 0;
        training_data.push(
            {
                input: [bp, f, dc, st, rn, asm, cld, hache, hdes, dbts, hpt, ftg, gas, at, ccp, alg, vpep, fwipep, wm, sfm],
                output: { covid: cov }
            }
        );
    });

    $('.predict').click(function () {
        setTimeout(() => {
            getInputs(
                $("#bp:checked").val(),
                $("#f:checked").val(),
                $("#dc:checked").val(),
                $("#st:checked").val(),
                $("#rn:checked").val(),
                $("#asm:checked").val(),
                $("#cld:checked").val(),
                $("#hache:checked").val(),
                $("#hdes:checked").val(),
                $("#dbts:checked").val(),
                $("#hpt:checked").val(),
                $("#ftg:checked").val(),
                $("#gas:checked").val(),
                $("#at:checked").val(),
                $("#ccp:checked").val(),
                $("#alg:checked").val(),
                $("#vpep:checked").val(),
                $("#fwipep:checked").val(),
                $("#wm:checked").val(),
                $("#sfm:checked").val(),
            ).then(getprob).then(getper).catch(err);
        }, 5000);
    })
})

let prediction;

function getInputs(bp, f, dc, st, rn, asm, cld, hache, hdes, dbts, hpt, ftg, gas, at, ccp, alg, vpep, fwipep, wm, sfm) {
    return new Promise(function (resolve, reject) {
        if (
            typeof bp === 'undefined' ||
            typeof f === 'undefined' ||
            typeof dc === 'undefined' ||
            typeof st === 'undefined' ||
            typeof rn === 'undefined' ||
            typeof asm === 'undefined' ||
            typeof cld === 'undefined' ||
            typeof hache === 'undefined' ||
            typeof hdes === 'undefined' ||
            typeof dbts === 'undefined' ||
            typeof hpt === 'undefined' ||
            typeof ftg === 'undefined' ||
            typeof gas === 'undefined' ||
            typeof at === 'undefined' ||
            typeof ccp === 'undefined' ||
            typeof alg === 'undefined' ||
            typeof vpep === 'undefined' ||
            typeof fwipep === 'undefined' ||
            typeof wm === 'undefined' ||
            typeof sfm === 'undefined') {
            reject("Running error....");
        } else {
            net.train(training_data);
            prediction = net.run([bp, f, dc, st, rn, asm, cld, hache, hdes, dbts, hpt, ftg, gas, at, ccp, alg, vpep, fwipep, wm, sfm]);
            resolve();
        }
    });
}

function getprob() {
    if (prediction.covid.toString()[2] >= 5) {
        $('.prob').html(`
            <b class="red">${prediction.covid}</b><br>
        `)
    } else {
        $('.prob').html(`
            <b class="green">${prediction.covid}</b><br>
        `)
    }
}

function getper() {
    let per = prediction.covid.toString()[2] + prediction.covid.toString()[3] + "." + prediction.covid.toString()[4] + prediction.covid.toString()[5] + "%";
    if (prediction.covid.toString()[2] >= 5) {
        $('.per').html(`
            <b class="red">${per}</b><br>
        `)
        $('.out').html(`
            <b class="red">Infected/Not Safe</b><br>
        `)
    } else {
        $('.per').html(`
            <b class="green">${per}</b><br>
        `);
        $('.out').html(`
            <b class="green">Not Infected. Safe</b><br>
        `)
    }
}

function err() {
    $('.prob').html(`
        <b class="errs">Something went wrong. Please check if your inputs are complete.</b>
    `);
    $('.per').html(`
        <b class="errs">Something went wrong. Please check if your inputs are complete.</b>
    `);
    $('.out').html(`
        <b class="errs">Something went wrong. Please check if your inputs are complete.</b>
    `);
}

$('.close').click(function () {
    window.location.reload();
})