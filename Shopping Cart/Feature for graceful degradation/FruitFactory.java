import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)
import java.util.Random;
/**
 * Write a description of class Ether here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class FruitFactory extends Actor
{
    /**
     * Act - do whatever the Ether wants to do. This method is called whenever
     * the 'Act' or 'Run' button gets pressed in the environment.
     */
    public Actor MakeFruit(){
        Random rand = new Random();
        int  nx = rand.nextInt(3);
        switch(nx){
            case 0: Grapes g = new Grapes();
            return g;
            case 1: Ap a = new Ap();
            return a;
            case 2: SB s = new SB();
            return s;
            default:
            Ap ap = new Ap();
            return ap;
        }
    }
    public void act() 
    {
        // Add your action code here.
    }    
}
