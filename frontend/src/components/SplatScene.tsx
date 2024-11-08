import { useEffect, useRef } from 'react'
import { WebGLRenderer, Scene, Camera, OrbitControls, Loader } from 'gsplat';
import { LineBasicMaterial, Vector3, BufferGeometry, Line } from 'three';


function SplatScene() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const scene = new Scene();
        const camera = new Camera();
        const renderer = new WebGLRenderer(canvasRef.current);
        const controls = new OrbitControls(camera, renderer.canvas);

        //create a blue LineBasicMaterial
        const material = new LineBasicMaterial( { color: 0x0000ff } );
        const points = [];
        points.push( new Vector3( - 10, 0, 0 ) );
        points.push( new Vector3( 0, 10, 0 ) );
        points.push( new Vector3( 10, 0, 0 ) );

        const geometry = new BufferGeometry().setFromPoints( points );
        const line = new Line( geometry, material );
        // scene.add( line );
        scene.objects.push(line);
        
        async function main() {
            const url = "https://huggingface.co/datasets/dylanebert/3dgs/resolve/main/bonsai/bonsai-7k.splat";
        
            await Loader.LoadAsync(url, scene, () => {});
        
            const frame = () => {
                controls.update();
                renderer.render(scene, camera);
        
                requestAnimationFrame(frame);
            };
        
            requestAnimationFrame(frame);
        }
    
        main(); 
    }, []);

    return (
        <canvas className="w-full p-2" ref={canvasRef}> </canvas>
    )
}

export default SplatScene