import React, { Component } from 'react'
import * as THREE from 'three'
import { MTLLoader, OBJLoader } from 'three-obj-mtl-loader'
import OrbitControls from 'orbit-controls-es6'

import { l } from '../helpers'

let scene
, camera
, renderer
, geometry
, material
, cube
, controls
, frameId
, meshModel

// const loaderManager = new THREE.LoadingManager()
const mtlLoader = new MTLLoader()
const objLoader = new OBJLoader()

export default class SpaceExplorer extends Component {
  constructor(props) {
    super(props)    
    this.canEl = React.createRef()
  }

  componentDidMount() {
    this.initScene()
    this.addObjects()
  }

  initScene = () => {
    const el = this.canEl.current
    , width = el.clientWidth
    , height = el.clientHeight
    
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000 )
    renderer = new THREE.WebGLRenderer({ antialias: true })
    controls = new OrbitControls(camera, renderer.domElement)
    
    // renderer.setClearColor('#ffffff')
    renderer.setSize(width, height)
    el.appendChild(renderer.domElement)
    window.addEventListener('resize', this.handleResize)
  }

  addObjects = () => {
    geometry = new THREE.BoxGeometry(1, 1, 1)
    material = new THREE.MeshBasicMaterial({ wireframe:true, color: 0xffff00 })
    cube = new THREE.Mesh(geometry, material)

    camera.position.z = 5
    scene.add(cube)

    const ambient = new THREE.AmbientLight( 0xffffff, 1 )
    scene.add( ambient )
        
    // let meshObj = 'assets/Chair.obj'
    // , meshMtl = 'assets/Chair.mtl'
    // let path = 'assets/endor/'
    // , meshObj = 'endor.obj'
    // , meshMtl = 'endor.mtl'
    // let path = 'assets/geonosis/'
    // , meshObj = 'geonosis.obj'
    // , meshMtl = 'geonosis.mtl'

    let path = 'assets/dagobah/'
    , meshObj = 'dagobah.obj'
    , meshMtl = 'dagobah.mtl'

    mtlLoader.setPath( path );
    mtlLoader.load( meshMtl,  materials => {
      l(materials)
      materials.preload()
      objLoader.setMaterials( materials );
      objLoader.setPath( path );
      objLoader.load( meshObj,  mesh => {
        l(mesh)     
        mesh.children.forEach(curr => {          
          l(curr)
          // if(curr.name !== "atmos"){          
            curr.scale.x = curr.scale.y = curr.scale.z = .02;
            scene.add( curr )
          // }
        })
        meshModel = mesh  
        // meshModel.scale.x = meshModel.scale.y = meshModel.scale.z = .02;
        // scene.add( meshModel )
        // camera.lookAt(meshModel.position)

      }, pr => { //l(pr) 
      }, err => { l(err) 
      })
    })
    this.renderScene()    
    // this.animate()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    this.stop()
    this.canEl.current.removeChild(renderer.domElement)
  }

  handleResize = () => {
    const el = this.canEl.current    
    , width = el.clientWidth
    , height = el.clientHeight

    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  stop = () => window.cancelAnimationFrame(this.frameId)

  animate = () => {
    // l(meshModel)
    // if(meshModel) {
    //   meshModel.children.forEach(child => child.rotation.y += 0.01)
    // }

    this.renderScene()
    frameId = window.requestAnimationFrame(this.animate)
  }

  renderScene = () => renderer.render(scene, camera)  

  render() {
    return (    
      <div 
        className="ctn-outer"
        ref={this.canEl}
      >
        <span>SpaceExplorer</span>
      </div>
    )
  }
}
