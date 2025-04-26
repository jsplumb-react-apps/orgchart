import React, {useRef, useState} from "react";

import { InspectorComponent } from "@jsplumbtoolkit/browser-ui-react"

export default function OrgchartInspector({surfaceId, onSelect}) {


    const [current, setCurrent] = useState(null)
    const [manager, setManager] = useState(null)
    const [reports, setReports] = useState([])

    function getImage(person) {
        return `/avatars/${person.data.img}`
    }

    function renderPersonLink(person) {
        return <a className="jtk-orgchart-inspector-person" href="#" data-id={person.data.id} onClick={() => onSelect(person)}>
                <img src={getImage(person)} alt={person.data.name}/>
                <div>
                    {person.data.name}
                    <span>{person.data.title}</span>
                </div>
                </a>
    }

    const renderEmptyContainer = () => {
        setCurrent(null)
        setManager(null)
        setReports([])
    }

    const refresh = (obj, cb) => {
        setCurrent(obj)
        setManager(obj.getTargetEdges().map(e => e.source)[0])
        setReports(obj.getSourceEdges().map(e => e.target))
    }


    return <InspectorComponent refresh={(obj) => refresh(obj)} renderEmptyContainer={renderEmptyContainer}>

        {current== null && ''}

        {current != null &&
            <div className="jtk-orgchart-inspector">

                <h1>{current.data.name}</h1>
                <h2>{current.data.title}</h2>
                {reports.length > 0 && <>
                    <h5>Reports:</h5>
                    {reports.map(r => renderPersonLink(r))}

                </>}

                {manager != null && <>

                    <h5>Reports to:</h5>
                    {renderPersonLink(manager)}

                </>}

            </div>

        }

    </InspectorComponent>

}
