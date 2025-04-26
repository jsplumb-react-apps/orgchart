import React, { useEffect, useRef } from "react";

import './orgchart.css'

import {
    DEFAULT,
    AnchorLocations,
    BlankEndpoint,
    EVENT_TAP,
    HierarchyLayout,
    PlainArrowOverlay,
    EVENT_CANVAS_CLICK
} from "@jsplumbtoolkit/browser-ui"

import {
    SurfaceComponent,
    MiniviewComponent,
    SurfaceProvider
} from "@jsplumbtoolkit/browser-ui-react";

import OrgchartInspector from './InspectorComponent'
import PersonComponent from "./PersonComponent";


export default function Orgchart(props) {

    const surfaceComponent = useRef(null)
    const surface = useRef(null)

    function selectPerson(person) {
        surface.current.toolkitInstance.setSelection(person)
        surface.current.centerOnAndZoom(person, 0.15)
    }

    const renderParams = {
        consumeRightClick:false,
        elementsDraggable:false,
        defaults:{
            endpoint:BlankEndpoint.type,
            anchor:AnchorLocations.ContinuousTopBottom
        },
        events: {
            [EVENT_CANVAS_CLICK]: (e) => {
                surface.current.toolkitInstance.clearSelection()
            }
        },
        zoomToFit:true,
        layout:{
            type: HierarchyLayout.type
        }
    }

    const view = {
        nodes: {
            [DEFAULT]: {
                events: {
                    [EVENT_TAP]: (p) => {
                        selectPerson(p.obj)
                    }
                },
                jsx:(ctx) => <PersonComponent ctx={ctx}/>
            }

        },
        edges: {
            default: {
                overlays: [
                    {
                        type: PlainArrowOverlay.type,
                        options: {
                            location: 1,
                            width: 10,
                            length: 10
                        }
                    }
                ]
            }
        }
    }

    useEffect(() => {

        surface.current = surfaceComponent.current.getSurface()

    }, [])


    return <div style={{width:"100%",height:"100%",display:"flex"}}>
            <SurfaceProvider>
                <div className="jtk-demo-canvas">

                    <SurfaceComponent renderOptions={renderParams} viewOptions={view} ref={ surfaceComponent } url="/public/dataset.json">
                        <MiniviewComponent/>
                    </SurfaceComponent>

                </div>
                <div className="jtk-demo-rhs">
                    <OrgchartInspector onSelect={selectPerson}/>
                </div>
            </SurfaceProvider>
        </div>

}
