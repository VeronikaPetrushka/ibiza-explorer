const places = [
    {
      name: "Ibiza Casino",
      location: "Ibiza Town, Passeig Joan Carles I",
      coordinates: [
        { lat: 38.9113, lng: 1.4445 }
      ],
      image: require('../assets/places/1.png'),
      description: "Situated in the heart of Ibiza Town, Ibiza Casino is a hotspot for nightlife enthusiasts looking to experience a different side of the island’s entertainment offerings. The casino is part of the Ibiza Gran Hotel complex, boasting a luxurious and sophisticated ambiance that attracts both high rollers and casual visitors. Inside, you’ll find a variety of gaming options, including poker, blackjack, and roulette, as well as a lively poker room where international tournaments are hosted. Beyond the gaming tables, the venue offers a high-class bar and lounge with a refined menu of cocktails and snacks, making it an excellent choice for a full evening of entertainment.",
      touristTip: "Dress smartly, as there’s a formal dress code, and bring ID for entry. Try to visit during a poker tournament if you enjoy watching or playing in a thrilling setting.",
      achievement: 'High Stakes Explorer! You`ve tried your luck at the iconic Ibiza Casino. Who said Ibiza is only about beaches?'
    },
    {
      name: "Dalt Vila",
      location: "Ibiza Town",
      coordinates: [
        { lat: 38.9067, lng: 1.4361 }
      ],
      image: require('../assets/places/2.png'),
      description: "Dalt Vila, the “Upper Town,” is a UNESCO World Heritage Site and one of the most iconic places on Ibiza. This ancient fortress town sits high above the harbor, offering breathtaking views over the Mediterranean. With cobbled streets, historic walls, and beautiful old buildings, it’s a place where history and beauty meet. The area is home to the Catedral de Santa María, quaint shops, and charming restaurants. Exploring Dalt Vila allows you to step back into the island’s rich history, from Phoenician settlements to medieval defense structures.",
      touristTip: "Wear comfortable shoes for walking up steep paths. Visiting in the early morning or late afternoon provides a quieter experience and fantastic lighting for photos.",
      achievement: 'Historic Heights! You`ve conquered the ancient fortress of Dalt Vila. Enjoy the views from Ibiza`s history-rich heart!'
    },
    {
      name: "Es Vedrà",
      location: "Southwest coast of Ibiza, near Cala d’Hort",
      coordinates: [
        { lat: 38.8710, lng: 1.2095 }
      ],
      image: require('../assets/places/3.png'),
      description: "Es Vedrà is a small, rocky island situated off the southwestern coast of Ibiza, renowned for its dramatic presence and mystical reputation. Towering over 400 meters, Es Vedrà is steeped in myth and legend, with local tales of magnetic energies and historical associations with Odysseus and Atlantis. While you cannot visit the island itself, you can admire it from several viewing points along the coast. Many come here to watch the sunset, drawn by the magical atmosphere and the unique landscape.",
      touristTip: "For the best view, head to the cliff at Torre des Savinar, also known as the 'Pirate Tower,' and plan to arrive in time for sunset.",
      achievement: 'Mystic Views! You’ve gazed upon the legendary Es Vedrà. Who knows what secrets it holds?'
    },
    {
      name: "Platja d’en Bossa",
      location: "East coast, near Ibiza Town",
      coordinates: [
        { lat: 38.8947, lng: 1.4045 }
      ],
      image: require('../assets/places/4.png'),
      description: "Platja d’en Bossa is Ibiza’s longest beach and one of its most famous. It’s the ideal place for beachgoers and party enthusiasts, as it offers both relaxing areas with sunbeds and a plethora of beach clubs and bars like Ushuaïa and Bora Bora. The turquoise waters and golden sands create a perfect beach day setting, while the surrounding restaurants and shops provide all the amenities for a full day out. Its vibrant atmosphere makes it a favorite among young crowds and those looking for beachside entertainment.",
      touristTip: "Arrive early to secure a good spot on the sand, and explore nearby bars if you're interested in Ibiza’s beach party scene.",
      achievement: 'Beach Bliss! You’ve soaked up the vibes at Platja d’en Bossa. Sun, sand, and sea—Ibiza style!'
    },
    {
      name: "Cala Comte",
      location: "Western coast, near Sant Antoni",
      coordinates: [
        { lat: 38.9542, lng: 1.2259 }
      ],
      image: require('../assets/places/5.png'),
      description: "Cala Comte is famous for its stunning turquoise waters and mesmerizing views of nearby islets. The beach is a combination of sandy shores and rocky coves, with crystal-clear waters that are perfect for swimming and snorkeling. Known for spectacular sunsets, Cala Comte attracts locals and tourists alike who gather to watch the sun dip below the horizon. Several beachside restaurants, like Sunset Ashram, offer delicious food and drinks to enhance the experience.",
      touristTip: "Come in the afternoon to secure a good spot for the sunset. Bring a snorkel to explore the underwater life around the rocks.",
      achievement: 'Sunset Chaser! You’ve discovered Cala Comte’s legendary views. Nothing like a golden Ibiza sunset!'
    },
    {
      name: "Sant Antoni de Portmany",
      location: "Western Ibiza",
      coordinates: [
        { lat: 38.9806, lng: 1.3000 }
      ],
      image: require('../assets/places/6.png'),
      description: "Sant Antoni is a lively coastal town known for its world-famous sunset strip and bustling nightlife. Popular spots such as Café Mambo and Café del Mar offer front-row seats to Ibiza’s legendary sunsets, with live DJs providing the soundtrack. Beyond the nightlife, the town has a lovely promenade, beaches, and historic sites, including the Church of San Antonio. The town’s vibrant and welcoming atmosphere makes it a popular base for tourists exploring the island.",
      touristTip: "Visit the sunset strip early to grab a good seat at a bar or café. Exploring the area during the day reveals a quieter side with local shops and scenic views.",
      achievement: 'Sunset Spirit! You’ve joined the crowds at Sant Antoni, where every sunset is unforgettable.'
    },
    {
      name: "Cova de Can Marçà",
      location: "Near Port de Sant Miquel, northern Ibiza",
      coordinates: [
        { lat: 39.0856, lng: 1.4436 }
      ],
      image: require('../assets/places/7.png'),
      description: "The Cova de Can Marçà is an ancient limestone cave nestled in the cliffs near Port de Sant Miquel. Originally used by smugglers, this cave is now a fascinating attraction where visitors can explore impressive stalactites, stalagmites, and underground pools. The tour includes a light and sound show that highlights the cave’s unique formations, and outside, the panoramic views of the bay are spectacular. It’s a fantastic family-friendly activity and a chance to experience Ibiza’s natural wonders away from the beach.",
      touristTip: "Wear sturdy shoes for the slippery pathways, and don’t forget your camera for the breathtaking views outside the cave.",
      achievement: 'Underground Explorer! You`ve ventured into the mystical Cova de Can Marçà. Ancient secrets await!'
    },
    {
      name: "Sa Caleta",
      location: "South coast, near Sant Josep de sa Talaia",
      coordinates: [
        { lat: 38.8695, lng: 1.3447 }
      ],
      image: require('../assets/places/8.png'),
      description: "Sa Caleta is a beautiful horseshoe-shaped bay known for its striking red cliffs and calm, clear waters. The beach is popular among locals and is perfect for a quiet day of swimming and sunbathing. Close by are the archaeological remains of the first Phoenician settlement on the island, a UNESCO World Heritage Site, offering a fascinating glimpse into Ibiza’s ancient history. The peaceful setting and shallow waters make it ideal for families and those seeking a more secluded beach experience.",
      touristTip: "Try the local fish dishes at the nearby Sa Caleta restaurant. Arrive early to secure a spot on the sand, as the beach can get crowded.",
      achievement: 'Cliffside Serenity! You’ve discovered Sa Caleta’s unique red cliffs. Perfect spot for some history and beach vibes!'
    },
    {
      name: "Cala d’Hort",
      location: "Western coast, facing Es Vedrà",
      coordinates: [
        { lat: 38.8813, lng: 1.2274 }
      ],
      image: require('../assets/places/9.png'),
      description: "Cala d’Hort is a picturesque beach facing the mystical island of Es Vedrà, offering incredible views of the sea and rocks. Known for its calm waters, it’s a great spot for swimming, sunbathing, and taking in the natural beauty. The beach has a few small restaurants that offer local cuisine, and the sunsets here are unforgettable. Cala d’Hort is a favorite among photographers and nature lovers, as the dramatic scenery makes it one of the most iconic spots on Ibiza.",
      touristTip: "Bring a camera to capture the view of Es Vedrà. It’s also worth having a meal at a beachside restaurant for a relaxed and scenic dining experience.",
      achievement: 'Island Gazer! You`ve experienced the scenic Cala d’Hort with views of Es Vedrà. A picture-perfect Ibiza moment!'
    },
    {
      name: "Hippy Market Punta Arabí",
      location: "Es Canar, eastern Ibiza",
      coordinates: [
        { lat: 39.0044, lng: 1.5639 }
      ],
      image: require('../assets/places/10.png'),
      description: "Hippy Market Punta Arabí is Ibiza’s oldest and largest market, located in the beachside town of Es Canar. Open every Wednesday, the market offers a unique shopping experience with a vast selection of handmade crafts, clothing, jewelry, and art from around the world. With live music, food stalls, and an eclectic atmosphere, this market has retained its free-spirited vibe, attracting both locals and tourists seeking a piece of Ibiza’s bohemian heritage. It’s a fantastic place to pick up unique souvenirs and enjoy a day of exploring.",
      touristTip: "Arrive early to avoid the midday crowds, and bring cash as some stalls may not accept cards.",
      achievement: 'Boho Spirit! You’ve explored the colorful Hippy Market Punta Arabí. Unique treasures and good vibes all around!'
    },
    {
      name: "Las Dalias Hippy Market",
      location: "San Carlos, northern Ibiza",
      coordinates: [
        { lat: 39.0333, lng: 1.5541 }
      ],
      image: require('../assets/places/11.png'),
      description: "Las Dalias Hippy Market is a must-visit for those interested in Ibiza’s alternative culture. This vibrant market, held every Saturday, features over 200 stalls selling artisan crafts, jewelry, vintage clothing, and handmade accessories. The atmosphere is lively, with musicians and street performers adding to the festive environment. Las Dalias also hosts special events, including night markets and live concerts, which attract both locals and visitors looking for an authentic and colorful shopping experience.",
      touristTip: "Try the freshly prepared food from local vendors, and stay for the live music if you visit during a night market.",
      achievement: 'Flower Child! You’ve wandered through the vibrant Las Dalias Market. Ibiza’s bohemian spirit is now yours!'
    },
    {
      name: "Ibiza Cathedral",
      location: "Dalt Vila, Ibiza Town",
      coordinates: [
        { lat: 38.9062, lng: 1.4366 }
      ],
      image: require('../assets/places/12.png'),
      description: "Located in the heart of Dalt Vila, Ibiza Cathedral, also known as the Cathedral of Our Lady of the Snows, is an impressive 14th-century church that offers stunning views of the city and coastline. Its Gothic architecture and serene interior make it a fascinating site for those interested in history and architecture. The cathedral is dedicated to Santa Maria la Major and features beautiful altarpieces, artifacts, and a notable collection of religious art. It’s a peaceful spot to take a break from the bustling streets below and appreciate the cultural heritage of Ibiza.",
      touristTip: "Climb up to the cathedral in the late afternoon for beautiful lighting and cooler temperatures.",
      achievement: 'Sacred Views! You`ve reached the Ibiza Cathedral in Dalt Vila. History and views await from the heart of the old town.'
    },
    {
      name: "Atlantis (Sa Pedrera)",
      location: "Near Cala d’Hort",
      coordinates: [
        { lat: 38.8764, lng: 1.2244 }
      ],
      image: require('../assets/places/13.png'),
      description: "Sa Pedrera, often referred to as Atlantis by locals, is a hidden gem known for its unique rock formations and tranquil waters. This former quarry is a secluded paradise with deep turquoise pools, intriguing carved stone steps, and natural saltwater pools. The challenging hike to reach Atlantis makes it less crowded and adds to its mystique. The site is popular for swimming, snorkeling, and photography, offering a peaceful and surreal experience away from the main tourist areas.",
      touristTip: "Be prepared for a steep and rocky descent. Wear sturdy shoes, bring water, and remember that there are no facilities, so pack accordingly.",
      achievement: 'Hidden Paradise! You`ve made the trek to Atlantis. Only the adventurous find this secret gem!'
    },
    {
      name: "Necropolis del Puig des Molins",
      location: "Ibiza Town",
      coordinates: [
        { lat: 38.9061, lng: 1.4297 }
      ],
      image: require('../assets/places/14.png'),
      description: "The Necropolis del Puig des Molins is one of the best-preserved Phoenician cemeteries in the Mediterranean, dating back over 2,500 years. Located just outside Dalt Vila, this archaeological site includes thousands of tombs and a museum that showcases ancient artifacts, burial practices, and the history of Ibiza’s early inhabitants. The necropolis is a UNESCO World Heritage Site and offers a unique perspective on Ibiza’s ancient past, providing a quiet and contemplative space amid the vibrant surroundings of the city.",
      touristTip: "Visit the museum to better understand the site’s history. Early mornings are ideal for a quiet exploration of the tombs and museum.",
      achievement: 'Ancient Explorer! You’ve walked through the Necropolis del Puig des Molins, uncovering Ibiza’s mysterious past.'
    }
  ];

export default places;