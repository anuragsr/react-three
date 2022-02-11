import React, { Component } from 'react'
import * as THREE from 'three'
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

export default class AnimatedCharacter extends Component {
  constructor(props) {
    super(props)    
    this.canEl = React.createRef()
  }

  componentDidMount() {
    const el = this.canEl.current
    , width = el.clientWidth
    , height = el.clientHeight
    
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000 )
    renderer = new THREE.WebGLRenderer({ antialias: true })
    geometry = new THREE.BoxGeometry(1, 1, 1)
    material = new THREE.MeshBasicMaterial({ wireframe:true, color: 0x0ff100 })
    cube = new THREE.Mesh(geometry, material)
    controls = new OrbitControls(camera, renderer.domElement)

    camera.position.z = 4
    scene.add(cube)
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)
    el.appendChild(renderer.domElement)

    window.addEventListener('resize', this.handleResize)
    this.animate()
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
    cube.rotation.x += 0.01

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
        <span>AnimatedCharacter</span>
      </div>
    )
  }
}

