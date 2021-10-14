import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {Container} from '../styles/RecipesStyle';
import RecipesCard from '../components/RecipesCard';

const Recipe = [
  {
    id: '1',
    recipeName: 'Apple pie Energy bites',
    recipeImg: require('../assets/recipes/apple-pie.jpg'),
    calories: 109,
    protein: 2,
    fat: 6,
    carbs: 12,
    recipeIngredients: `
1/2 cup (45g) sliced almonds 
1/2 cup (45g) walnuts
1/4 cup (22g) rolled oats
1/2 cup (106g) pitted Medjool dates
1 teaspoon lemon zest, finely grated
1/4 teaspoon salt
1/4 teaspoon nutmeg, freshly grated
1 1/2 teaspoons ground cinnamon
1/3 cup (30g) unsweetened coconut
3/4 cup (62g) chopped dried apple slices`,
    Directions: `Preheat oven to 350°F (177ºC). Place the almonds, walnuts and oats on a rimmed baking sheet and bake until lightly toasted, 8 minutes. Set aside and allow the mixture to cool completely.
Place the apples and dates in the bowl of a food processor and pulse until finely chopped. Add the toasted nuts and oats, vanilla, lemon zest, cinnamon, nutmeg and salt and pulse until the mixture is finely chopped and forms clumps, about 30 pulses.
Roll the mixture into 14 balls, about 1 tablespoon each. Roll the balls in the coconut. Store in the refrigerator in an airtight container for up to 1 month.`,
  },
  {
    id: '2',
    recipeName: 'Grilled Salmon & mango',
    recipeImg: require('../assets/recipes/Grilled-Salmon-With-Spicy-Mango-Salsa.jpg'),
    calories: 464,
    protein: 41,
    fat: 25,
    carbs: 14,
    recipeIngredients: `
1 tablespoon olive oil
2 tablespoons salt-free Cajun seasoning
3/4 teaspoon salt, divided
4 5-ounce (142g) skin-on salmon fillets
1 mango, flesh chopped, skin and pit discarded
1 small avocado, flesh diced, skin and pit discarded
1 kiwi, peeled and finely diced
1 small shallot, finely diced (about 2 tablespoons, chopped)
1/2 small jalapeno pepper, finely chopped
1/4 cup cilantro, chopped
4 teaspoons lime juice
1 tablespoon safflower oil
    `,
    Directions:`
Combine the olive oil and Cajun seasoning in a large bowl. Add the salmon and carefully turn the salmon in the spice paste to coat. Place fillets on a plate, skin side down, and season with 1/2 teaspoon of the salt. Set aside.
In a medium bowl, combine the remaining 1/4 teaspoon salt with the mango, avocado, kiwi, shallot, jalapeno, cilantro and lime juice; set aside.
Rub outdoor grill grates or grill pan with a paper towel moistened with the safflower oil. Preheat grill or grill pan over medium-high until hot. Turn on the kitchen fan if cooking on a stove. Put the fillets on the grill/grill pan skin side up and cook for 3–4 minutes. (Don’t move the fillets during this time or they may stick.) Flip the fillets and cook skin side down until the fish is medium in the center, about 3 minutes. (To test for doneness: Insert a steak knife into the center of a fillet, count to 3, remove knife and touch it. A cool knife means the fish is rare, a warm knife means the fish is medium, a hot knife indicates the fish is well done.)
Transfer the fish to plates and serve with the salsa spooned over the top.
Tip: Choose fillet pieces from the thicker, collar end of the salmon. Thinner pieces from the tail tend to dry out quickly on the grill. Though, you don’t eat the skin, leave it on to help keep the fish moist.
    `,
  },
  {
    id: '3',
    recipeName: 'Fruit & Cinnamon Chips',
    recipeImg: require('../assets/recipes/fruit-salsa-with-cinnamon-chips.jpg'),
    calories: 129,
    protein: 3,
    fat: 1,
    carbs: 28,
    recipeIngredients: `
For the chips:
12 wonton wrappers, cut into quarters
1 tablespoon sugar
1/2 teaspoon cinnamon
Cooking spray

For the salsa:
2 apples, diced
1 cup (240g) diced strawberries
1 lime, juiced
1/4 cup (60g) finely chopped onion
1/4 cup (15g) chopped fresh cilantro
`,
    Directions:`Preheat the oven to 375°F/190ºC.
Lightly coat a baking sheet with cooking spray, and spread the wonton wrappers on it. Spritz the tops of the wonton wrappers with cooking spray.
In a small bowl, mix together the sugar and cinnamon, and sprinkle it over the wonton wrappers.
Bake for 9–10 minutes until they are browned and crispy. Cool completely; they will crisp up a bit more as they cool.
Meanwhile, in a medium bowl, stir together the apples, strawberries, lime juice, onion and cilantro.
Cover tightly, and refrigerate until ready to eat.
Serve with the cinnamon wonton chips.`,
  },
  {
    id: '4',
    recipeName: 'Greek Chicken Soup',
    recipeImg: require('../assets/recipes/greek-lemon-chicken-soup.jpg'),
    calories: 187,
    protein: 18,
    fat: 7,
    carbs: 14,
    recipeIngredients: `
1 tablespoon olive oil
1 large leek, white and light green parts only, thinly sliced
1 medium garlic clove, minced
7 cups (1.7ml) low-sodium chicken broth
1/2 teaspoon salt
2 cups (170 g) white meat rotisserie chicken, shredded or chopped
1 1/2 cups (65g) baby Lacinato kale, chopped
1 cup (194g) cooked brown rice
3 large eggs
3 tablespoons lemon juice, freshly squeezed
2 tablespoons fresh dill, chopped
1 tablespoon cornstarch
1 1/2 teaspoons lemon zest, finely grated
1/4 teaspoon black pepper`,
    Directions:`
Heat the oil in a large pot over medium heat. Add the leeks and cook, stirring frequently, until the leeks are tender but not browned, 3 minutes. Add the garlic and cook until fragrant, 45 seconds.
Add the broth, chicken, kale, rice and salt, and bring to a simmer. Cover, reduce heat to low, and cook for 10 minutes.
In a medium bowl, whisk the eggs, lemon juice, dill, cornstarch, and lemon zest. Whisk 1 cup (240ml) of the hot soup into the egg mixture. Pour the mixture back into the soup and cook over low heat, stirring constantly, until the soup thickens, about 4 minutes. Remove the pot from heat and add the pepper.`,
  },
  {
    id: '5',
    recipeName: 'Fajita Roast Chicken',
    recipeImg: require('../assets/recipes/fajita-roast-chicken.jpg'),
    calories: 375,
    protein: 22,
    fat: 19,
    carbs: 16,
    recipeIngredients: `
2 teaspoons chile powder
1 teaspoon ground cumin
1 teaspoon granulated garlic
1 teaspoon dried oregano
Kosher salt and pepper
1 3 1/2–4-pound (1,590g) whole chicken, spatchcocked (see note)
2 tablespoons olive oil
3 bell peppers, quartered, stemmed and seeded
1 large red or yellow onion, peeled and cut into 1-inch wedges through the root
1 head garlic, halved

Optional Serving Suggestions

Warm corn tortillas
Sour cream
Cilantro sprigs
Hot sauce
Lime wedges`,
    Directions:`
Preheat the oven to 400ºF (204ºC).
In a small bowl, combine the chile powder, cumin, granulated garlic, dried oregano, 1 teaspoon salt and 1/2 teaspoon pepper. Drizzle the spatchcocked chicken with 1 tablespoon olive oil and sprinkle the spice rub all over the bird.
In a 9-by-13-inch baking dish, toss the bell peppers with the onion, garlic and the remaining 1 tablespoon olive oil. Season with salt and pepper. Spread in an even layer and arrange the chicken on top, breast side up.
Bake until the vegetables are tender, the chicken is golden brown, and its juices run clear, about 1 hour. Transfer the chicken to a cutting board and let rest (do not cover with foil—this traps the steam and makes the chicken skin flabby.) Meanwhile, return the vegetables to the oven and cook until beginning to brown, about 10 minutes more.
Carve the chicken and transfer to a platter with the roasted peppers, onions and garlic. Serve right away, passing warm tortillas, sour cream, cilantro, hot sauce and lime wedges at the table.
Note: To spatchcock your chicken, set it on its butt, facing away from you. Using kitchen shears or a sharp chef’s knife, cut along each side of the backbone to remove it from the chicken. Lay the chicken on a work surface breast side up. Using the heel of your hand, press down firmly to flatten the breast bone. Alternatively, you can ask your butcher to do this for you.`,
  },
  {
    id: '6',
    recipeName: 'Mini banana bran muffin',
    recipeImg: require('../assets/recipes/mini-banana-bran-muffin.jpg'),
    calories: 150,
    protein: 4,
    fat: 2,
    carbs: 29,
    recipeIngredients: `
1 cup (60 grams) unprocessed wheat bran
1 cup (125 grams) all-purpose flour
1/4 cup (55 grams) firmly packed light brown sugar
2 teaspoons baking powder
1 teaspoon ground cinnamon
1/4 teaspoon salt
2 large (50 grams each) eggs
1 cup (250 grams) skim (1%) milk
1 medium (120 grams) ripe banana (about 1/3 cup mashed)
1/4 cup (85 grams) light molasses
1 teaspoon vanilla extract`,
    Directions:`Preheat oven to 375°F. Spray 32 mini-muffin cups with cooking spray or line mini muffin pan with paper liners then spray with cooking spray (NOTE: These protein and fiber rich muffins are made without added fat so they will stick to paper liners that are not sprayed with cooking spray.)
Combine wheat bran, flour, sugar, baking powder, cinnamon, and salt in a large bowl.
Beat together eggs, milk, banana, molasses, and vanilla in a medium bowl. Add egg mixture to the flour mixture and stir just until moistened.
Spoon 1 tablespoon batter evenly into prepared muffin cups. Bake 10 minutes or until a toothpick inserted into the center of the muffin comes out clean. Cool muffins in the pan on a wire rack for 5 minutes. Remove from pan; serve warm or room temperature.`,
  },
  {
    id: '7',
    recipeName: 'Berry peanut-b smoothie',
    recipeImg: require('../assets/recipes/minute-berry-peanut-butter-smoothie-for-two.jpg'),
    calories: 156,
    protein: 5,
    fat: 8,
    carbs: 19,
    recipeIngredients: `
6 ounces (about 1 1/2 cups) fresh or frozen raspberries
2 tablespoons reduced-fat milk
2 tablespoons smooth natural peanut butter
1 teaspoon honey
1 cup ice cubes`,
    Directions:`Add all ingredients to a blender, and blend until smooth. Then, share it with a buddy and enjoy!`,
  },
  {
    id: '8',
    recipeName: 'Rotini & chicken peppers',
    recipeImg: require('../assets/recipes/rotini-with-chicken-peppers.jpg'),
    calories: 407,
    protein: 48.5,
    fat: 11.2,
    carbs: 66.6,
    recipeIngredients: `
3 cups (710 ml) low-sodium chicken or vegetable broth
2 tablespoons (30g) no-salt added tomato paste
4 cups (12 ounces/340g) dry whole-grain rotini pasta
1/4 cup (27g) oil-packed sun-dried tomatoes, drained and chopped
1 tablespoon (15 ml) olive oil
1 1/2 teaspoons (7.5 ml) chopped fresh rosemary
Salt and black pepper, to taste
1 small red bell pepper, thinly sliced
3 small (6 ounce/170g) boneless, skinless chicken breasts
1 teaspoon (5 ml) salt-free garlic seasoning blend
2 cups (440 ml) baby spinach
1/4 cup (60 ml) Parmesan cheese, shredded`,
    Directions:`In the pot of an electric pressure cooker, whisk together the broth and tomato paste until the tomato paste is dissolved. Add the pasta, sun-dried tomatoes, olive oil, rosemary, 1/4 teaspoon salt and several grinds of pepper. Stir to combine. Place the bell peppers on top of the pasta. Season the chicken with the garlic seasoning and place on top of the pasta mixture, do not stir.
Lock on the lid, select the Manual/Pressure Cook function. Adjust  to high pressure and set timer for 4 minutes. Make sure the steam valve is in the “sealing” position.
When the cooking time is up, carefully quick-release the pressure.
Unlock the lid and transfer the chicken to a clean cutting board. Slice the meat into bite-size pieces and return them to the pot. Add the spinach and cheese and stir to wilt the spinach. Serve immediately.`,
  },
  {
    id: '9',
    recipeName: 'Apple pie donuts',
    recipeImg: require('../assets/recipes/apple-pie-donuts.jpg'),
    calories: 142,
    protein: 2,
    fat: 5,
    carbs: 76,
    recipeIngredients: `
3/4 cup (90g) gluten-free flour
1 teaspoon baking powder
3/4 teaspoon apple pie spice, divided
1/4 teaspoon salt
1/4 cup (45g) brown sugar
1/4 cup (60ml) milk
1/2 cup (75g) finely chopped apple
1/2 cup (125g) vanilla yogurt
1 egg, beaten
3 tablespoons coconut oil, melted
1 cup (100g) powdered sugar
2 drops of almond extract
3 tablespoons crushed pecans, (optional)`,
    Directions:`Preheat the oven to 350°F (177°C). Coat a donut pan with cooking spray and set aside.
In a mixing bowl combine the flour, baking powder, salt and 1/2 teaspoon apple pie spice. Add the apples, milk, yogurt, egg and oil. Mix until a thick batter forms.
Using a small spoon carefully fill each donut shape 3/4 of the way full. Be careful not to overfill. Bake 10–12 minutes.
Carefully remove the donuts and let cool completely on a wire rack.
To make the glaze, combine the powdered sugar, milk, almond extract and 1/4 teaspoon apple pie spice. If your mixture is too thick, add additional milk one teaspoon at a time until it reaches the right consistency.
Drizzle the glaze onto the donuts and sprinkle crushed pecans on top, if using.`,
  },
  {
    id: '10',
    recipeName: 'Banana Blueberry Toast',
    recipeImg: require('../assets/recipes/banana-blueberry-french-toast.jpg'),
    calories: 300,
    protein: 11,
    fat: 6,
    carbs: 53,
    recipeIngredients: `
2 medium bananas, divided
1 cup (237ml) unsweetened almond milk
2 large eggs
2 tablespoons flaxseeds, ground
1 teaspoon vanilla extract
1 teaspoon cinnamon, divided
1/2 teaspoon salt
1 1/2 cups (210g) blueberries, fresh or frozen and defrosted
2 tablespoons maple syrup
6 slices sprouted multigrain bread (try Ezekiel Sprouted Whole Wheat)`,
    Directions:`Put one of the bananas in a bowl and mash thoroughly with a fork. Add the almond milk, eggs, flaxseed, vanilla, 1/2 teaspoon of the cinnamon and salt, and whisk until smooth. Set aside.
In a small saucepan, combine the remaining 1/2 teaspoon cinnamon with the blueberries and maple syrup. Cook over medium heat, stirring frequently, until the blueberries have popped and the mixture is syrupy, 5 minutes. Keep warm over low heat.
Spray a large nonstick skillet and set over medium heat. Dip half of the bread slices in the banana mixture. Fry in the preheated pan until golden brown and cooked through (nick and peek to see if there’s any liquid egg remaining in the center), about 4 minutes per side. Transfer to a plate, cover, and set aside in a warm place. Repeat with the remaining bread and banana-egg mixture.
Slice the remaining banana. Serve each person 1 1/2 pieces French toast, 1/4 of the sliced banana and 3 tablespoons of syrup.`,
  },
];

const RecipesScreen = ({navigation}) => {

  const renderItem = ({item}) => {
  return (

  <RecipesCard
      itemData={item}
      onPress={()=> navigation.navigate('ViewRecipes', {itemData: item})}
  />
  );
}

    return (
      <View style={styles.container}>
       <FlatList
         data={Recipe}
         renderItem={renderItem}
         keyExtractor={item => item.id}
         showsVerticalScrollIndicator={false}
       />
       </View>
    );
};

export default RecipesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
});
