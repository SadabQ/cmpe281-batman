import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)
import java.util.Random;
/**
 * Write a description of class Elep here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class Elep extends Actor
{
    /**
     * Act - do whatever the Elep wants to do. This method is called whenever
     * the 'Act' or 'Run' button gets pressed in the environment.
     */
    int ate = 0;
    public void justMove(){
        move(2);
    }
    public void justTurn(){}
    public void moveAndTurn(){
        move(2);
        if(Greenfoot.isKeyDown("left")){
            turn(-2);
        }
        if(Greenfoot.isKeyDown("right")){
            turn(2);
        }
    }
    public void eat(){
        Actor grapes;
        grapes = getOneObjectAtOffset(0,0, Actor.class);
        if(grapes != null)
        {
            World w;
            w = getWorld();
            w.removeObject(grapes);
            Grapes g = new Grapes();
            FruitFactory f = new FruitFactory();
            Random rand = new Random();
            int  nx = rand.nextInt(580) + 20;
            int ny = rand.nextInt(380) + 20;
            w.addObject(f.MakeFruit(), nx, ny);
        }
    }
    public void act() 
    {
        // Add your action code here.
        moveAndTurn();
        eat();
    }
}
