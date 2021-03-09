let type_select = document.getElementById('element_type_list');
let element_select = document.getElementById('element_list');
let format_select = document.getElementById('format_list');
let add_to_export = document.getElementById('add_to_export');
let export_table = document.getElementById('export_table');
let export_button = document.getElementById('export_button');

let type = {'select':'Select', 'part':'Part', 'part_studio':'Part Studio', 'assembly':'Assembly', 'drawing':'Drawing'};
let elements = {'select':'Select', 'part1_ID':'Part 1', 'part2_ID':'Part 2'};
let formats_3D = {'stl':'STL', 'ap214':'AP214', 'step':'STEP', 'iges':'IGES'};
let formats_2D = {'dxf':'DXF', 'pdf':'PDF'};

element_select.disabled = true;
format_select.disabled = true;

// type_select.options[0] = new Option('test', 'Select');

for(index in type){
    type_select.options[type_select.options.length] = new Option(type[index], index);
};

let selected_type;

//update other selects when the 'element-type' is changed
type_select.addEventListener('change', (event) => {
    let selected_type = type_select.value;
    format_select.disabled = true;
    
    if (selected_type !== 'select') {
        element_select.disabled = false;

        //removes old options when selection changes
        for(i=element_select.options.length-1; i>=0; i--){
            element_select.remove(i);
        }
        //add available elements here
        for(index in elements){
            element_select.options[element_select.options.length] = new Option(elements[index], index);
        };

        //removes old options when selection changes
        for(i=format_select.options.length-1; i>=0; i--){
            format_select.remove(i);
        }

        if (selected_type == 'drawing') {
            for(index in formats_2D){
                format_select.options[format_select.options.length] = new Option(formats_2D[index], index);
            };
        } else {
            for(index in formats_3D){
                format_select.options[format_select.options.length] = new Option(formats_3D[index], index);
            };
        }        
    } else {
        element_select.disabled = true;
        format_select.disabled = true;
    };
});

element_select.addEventListener('change', (event) => {
    let selected_element = element_select.value;
    
    if ((selected_element !== 'select') && (!element_select.disabled)) {
        format_select.disabled = false;
    } else {
        format_select.disabled = true;
    };
});

add_to_export.addEventListener('click', (event) => {
    let rowNum = export_table.length+1;
    let row = export_table.insertRow(rowNum);

    let include = row.insertCell(0);
    let elementType = row.insertCell(1);
    let elementName = row.insertCell(2);
    let exportFormat = row.insertCell(3);

    let chk = document.createElement('input');
    chk.type = "checkbox";
    chk.id = "checkbox_"+rowNum;
    chk.checked = true;

    let td = document.createElement('td');

    td.appendChild(chk)
    include.appendChild(td);
    elementType.innerHTML = type_select.value;
    elementName.innerHTML = element_select.value;
    exportFormat.innerHTML = format_select.value;
})



