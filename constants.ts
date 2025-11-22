import { FileData } from './types';

// Helper to determine type based on extension
const getType = (name: string): FileData['type'] => {
  const lower = name.toLowerCase();
  if (lower.endsWith('.jpg') || lower.endsWith('.png') || lower.endsWith('.jpeg') || lower.endsWith('.heic')) return 'image';
  if (lower.endsWith('.mp4') || lower.endsWith('.mov')) return 'video';
  if (lower.endsWith('.pdf')) return 'pdf';
  return 'unknown';
};

// Helper to clean path
const cleanPath = (path: string) => path.replace('/Tapa Agung View By Pramana', '').replace(/^\//, '');

// Raw Data with professionally renamed titles
const rawData = [
  // Transport
  { p: "/Tapa Agung View By Pramana/TAV Transportations & Tours", n: "Transportation Services Menu.pdf", i: "1RUbAlLyNIp7MAZSKiDI64qdfaKz-k1l_" },
  
  // Wellness
  { p: "/Tapa Agung View By Pramana/TAV Experiences/WELLNESS EXPERIENCES", n: "Yoga & Meditation Class.pdf", i: "1lhtAl2wClL8beBEs9O9FjrLOJxNgWqOI" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/WELLNESS EXPERIENCES", n: "Spa Treatments Menu.pdf", i: "1-C70TyeprJ6IlGGd53UTEKMCUp61k4zX" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/WELLNESS EXPERIENCES", n: "Holy Water Purification.png", i: "1VAMsOX33SH2oIsEiSy97WUwdYQGEYZdQ" },
  
  // Cultural
  { p: "/Tapa Agung View By Pramana/TAV Experiences/CULTURAL EXPERIENCE", n: "Batik Making Class.png", i: "1yJqHdgQQabJrWrX_UIaooUL21Ia6Ivx5" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/CULTURAL EXPERIENCE", n: "Samsara Living Museum Tour.png", i: "1W0LypaxmbNCONVXtUbig5xxdaepylblq" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/CULTURAL EXPERIENCE", n: "Sanghyang Dedari Trekking.png", i: "1dIqm85J90gAoqI6c4_PLWMtmKT6Bv6io" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/CULTURAL EXPERIENCE", n: "Canang Sari & Balinese Dance.png", i: "19btZirSe65gd2cmuyT8nNBgZDF_vFvYW" },
  
  // Culinary Journey
  { p: "/Tapa Agung View By Pramana/TAV Experiences/CULINARY JOURNEY", n: "Floating Breakfast Experience.png", i: "1ePU1zElEHPmfW6MvzHQXLt7PcxGhsqYv" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/CULINARY JOURNEY", n: "Romantic Candlelight Dinner.png", i: "18jbkTXiFjDv0u8EACCgk_p4d-C7C_UU9" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/CULINARY JOURNEY", n: "Traditional Cooking Class.png", i: "1BBGKMgIgzvMbSWu8IbaMtyY8W-PCkQVy" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/CULINARY JOURNEY", n: "Picnic Lunch.png", i: "14JansXtXvWrs9fEWFnaSbB1xepR2ig2X" },
  
  // Nature & Adventure
  { p: "/Tapa Agung View By Pramana/TAV Experiences/NATURE & ADVENTURE", n: "Telaga Surya Trekking.png", i: "1JzGSr92Tes3vSC5eipC144gu7Phm3BRq" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/NATURE & ADVENTURE", n: "Rafting, ATV & Flying Fox.png", i: "1SHWIyfDNbp63bN7dMN_KFSa2RWYywl6D" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/NATURE & ADVENTURE", n: "Mount Batur Sunrise Trek.png", i: "1piRboZ_Im7VGGJJz8X_vrZ168m9gOr34" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/NATURE & ADVENTURE", n: "Mount Agung Trekking.png", i: "1QKYagDFIz3IgYMcQ3Ziq59B1uhRyi1U_" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/NATURE & ADVENTURE", n: "Salak Agro Jeep & Rafting.jpg", i: "1WG2MzOldCr2fKG45b0OOFoKfG002nghO" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/NATURE & ADVENTURE", n: "Salak Agro Jeep & River Rafting.jpg", i: "1wPEvC2nORhavHA-aZJD7-olDeIpdXQfJ" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/NATURE & ADVENTURE", n: "Salak Agro Jeep & Cycling.jpg", i: "1CauPvtSHumhVbfomgYXtut0-7UShRnON" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/NATURE & ADVENTURE", n: "Salak Agro Jeep Sunrise.jpg", i: "10KUbjjxicVC0cwCpXtoALk2jgqpla_C3" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/NATURE & ADVENTURE", n: "Salak Agro Eco Trekking.jpg", i: "1hiQL-tKUdMMYtYBesuDxuwXlMP7QYQ8e" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/NATURE & ADVENTURE", n: "Salak Agro Jeep Sunrise Tour.jpg", i: "1NCccg4YboMUmJEXkqnlw-cKOgYYx13Qd" },
  { p: "/Tapa Agung View By Pramana/TAV Experiences/NATURE & ADVENTURE", n: "Countryside Cycling.jpg", i: "1dDGHLJZKD8EARmogVs50qLN7XzTZn6ue" },
  
  // Welcome
  { p: "/Tapa Agung View By Pramana/TAV Welcome", n: "Welcome Letter.pdf", i: "1hpw9JvBBOHxNaK1TFbAlWvuaDSD-SFJz" },
  
  // Edelweiss Restaurant - Food Photos (Renamed for relevance)
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Foto Makanan", n: "Signature Dish - Grilled Special.jpg", i: "15Dn0Jlx797Hb_wBVfHuw3Cm7Rz1hQ7LC" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Foto Makanan", n: "Signature Dish - Traditional Platter.jpg", i: "181rYlvh7zQlwwA7A0-KSefE1UFQTQNvN" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Foto Makanan", n: "Signature Dish - Seafood Delight.jpg", i: "19NepcOi63jJ3eiZd47kCZbkkUNE_2aBM" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Foto Makanan", n: "Signature Dish - Balinese Feast.jpg", i: "1Jew_GPvJphhqQANmFrfbz0n3Jk7JlU_e" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Foto Makanan", n: "Signature Dish - Light Bites.jpg", i: "1KawuDD6AtgiDAIoUMJkeLffY-I2kddLm" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Foto Makanan", n: "Signature Dish - Dessert Special.jpg", i: "1T24XngJM_Ne-BTvPydYcGm5ukDJ0lw4l" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Foto Makanan", n: "Signature Dish - Main Course.jpg", i: "1W9H6Plt3rdmNCtn4pTG74e16zOm_fazx" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Foto Makanan", n: "Signature Dish - Chef's Creation.jpg", i: "1blrDTZOWvraQQf9Yj2l8Y6SaUH56QxJk" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Foto Makanan", n: "Signature Dish - Appetizer.jpg", i: "1f5LV-SyL4Lm2rRUPOmBScYCaBezC7123" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Foto Makanan", n: "Signature Dish - Healthy Choice.jpg", i: "1fMt0phdRAxTLwEXsx4uuevUUqbMeNyUP" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Foto Makanan", n: "Signature Dish - Local Favorite.jpg", i: "1qDr9UbKAUj_2R1oq5SmREA2aS4OWShGi" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Foto Makanan", n: "Signature Dish - Spicy Delight.jpg", i: "100M3butXPKFoKSR4NNaJzW8puxhaBoNC" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Foto Makanan", n: "Signature Dish - Breakfast Special.jpg", i: "1IOH97OREM8U-D1AFUuB3a9Nz-dRorsbw" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Foto Makanan", n: "Signature Dish - Asian Fusion.jpg", i: "1_tn0ae0I6PuY94rXG5oCcF5H5OiRsIB5" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Foto Makanan", n: "Signature Dish - Welcome Drink.jpg", i: "1uklPzRNtx4zssMe8YlIEqWDEXXSns07v" },
  
  // Edelweiss Restaurant - Event Videos
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Catur Cemerlang Lunch.mov", i: "1sGBhkMmZnzkKdfBZZPBtZi-CKpiElEK2" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Crystal Holiday Lunch.mov", i: "14utbgc3yydaP4ZCBcWZ1t02AnXmHPHbz" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Astra Honda Motor Coffee Break.mov", i: "17iV-SvsLUxgD1Ok3omuCnIdrhn9C9M79" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Bawaslu Meeting.mov", i: "16CVd6nTgVA_OlmMO36F39TULA5oF8t9x" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - JKMPC Road to Lombok-Bali.mov", i: "1DlBGdGcYpw1_ZBUw3ovS0e8zIh-nkJVQ" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Independence Day Dinner 2025.mov", i: "13PG4sFgeaaZ8e0mSP9M-eBGib4sQg1sT" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Catur Cemerlang Group.mov", i: "197rhqIRMKrgfCMgjaZgFCZsW0pC19XxO" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Live Grill Seafood BBQ.mov", i: "1R5Sivw_ADmZ4Dpt5kGs5-ySKp5rpD7te" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - LPD Kerobokan Lunch.mov", i: "1Gb0EoUflNcGxhzsmPTdnuM5VUeG9gFJY" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Live Music Dinner.mov", i: "1QrjbLYeis4VDKxF73HCCVt0cV37qoApk" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Independence Day 2024.mov", i: "14D26pJN9kHPl94GzVmyM9gAtGzJVlSUP" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Kapolres Karangasem Breakfast.mov", i: "1WmK5jrWRDNqiVKEg3dflRD6j6Z4bWHBZ" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Balinese Dinner Party.mov", i: "1_BhN7hm0X8Ga4Tsnugr6xGc4Df4uVHmC" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Pertamina Group Lunch.mov", i: "1DBt3oUKLAn2ZaAejQjMW9G5SHnL5jcxI" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Kapolda Bali Visit.mov", i: "1kxqXQE7BN5oU0VBLVdXlNLfXh3-_bamd" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - TJSL Group Lunch.mov", i: "1Mz3wXi4yP08UC1vZBdggeF9xOpX20e06" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - BNN Lunch.mov", i: "1D_uIsF7NXnvvnbTWVgYbChQykUcTZJK-" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Cargill Lunch.mov", i: "1KjVXSucvECwp0nKVfP_fMVfQQbwgmwxv" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Rasayatra 2025.mov", i: "13b9Xhr6auhtb4itwXRsShFxb15ly4bHP" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - BPJS & Polres Meeting.mov", i: "1Lmh1AgkxOBMHH1mIqlX9pcreoVUSLgMs" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Adira Company Lunch.mov", i: "15v0iiOXRObutIRpppuCidJoXp_61qEEi" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Thousand Candles 2024.mov", i: "18bl-_2gbHG_cdqKoOtlJg1_iqxrknRhq" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Saraswati Farewell Dinner.mov", i: "1WcaGWBMZcP_Rz-4MUt_FPbn1rhhm83Tw" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - BNN Karangasem Meeting.mov", i: "1VpAp5L7AytVAX9of1Wc1PoT_07gKCfbo" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Gung Gung Adventure Lunch.mov", i: "1W3tS7t5D88mg4R3TU-V1lRur1QqlJpK1" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Catur Cemerlang Group.mov", i: "13j_5s5L7a0IWsUZS_LPm1ISkIBb8KCFN" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - BBQ & Bonfire Night.mov", i: "1AANbj80Atbe-lubWUil5xulpeP_3IJPP" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Kawasaki Dinner Gathering.mov", i: "1N3sJnhstiW3SMFVJrq7W-h4ey7TvsuU4" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Rasayatra 2024 Highlight.mov", i: "1-CGgUE9jWydciCh28J07lbuqJ9oe9G15" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Dinner with Topeng Dance.mp4", i: "1NELKcrVBKrt2qBRh_mIy0vAsXC10znaO" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Video Event ", n: "Event - Special Moment.mp4", i: "1xWsMJshehJSLNZXEsI8gnX1qzFBkIObL" },
  
  // Menu
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/MENU", n: "Breakfast A La Carte Menu.pdf", i: "1Zffbe299meYhVAvsWC-qiy0hPxe-1Rgz" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/MENU", n: "All Day Dining Menu.pdf", i: "10bx_ye34akyvK1fnGek0OlqASre2IepF" },
  
  // Restaurant Photos (Contextual)
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Photos", n: "Dining Table Setup.jpg", i: "1KpTvzR0OBxFw3SM-mLntu2k6HMghSIcP" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Photos", n: "Barista Station.jpg", i: "1n9h9-ie2c_GbAz2lUE1RD2rm1EZzHbFb" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Photos", n: "Restaurant Terrace View.jpg", i: "10GsnlUixplbV197kGjOWmjn4vUfrddtr" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Photos", n: "Indoor Dining Area.jpg", i: "1fWyrQ5OumhDUCVuaJP7g8JvyeiJFrlZ_" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Photos", n: "Restaurant Ambience.jpg", i: "1G5Y8LdyiR1gmfvJexuIg_YkDWzzUAmPe" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Photos", n: "Edelweiss Restaurant Exterior.jpg", i: "12L2nDEz-Ds1VJyz5vRIpz2X0R89o13fy" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Photos", n: "Restaurant View Deck.jpg", i: "1JkL19U9cTaRQLlNAru_QGUNFzCuyM7hJ" },
  
  // Table Manner
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Table Manner", n: "Table Manner Session - Batch III.mov", i: "1lOQn-KFjzWmzBDP70ZBixxwfaClSSPNB" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Table Manner", n: "Table Manner Session - Batch I.mov", i: "1QsmWLDE1jtHiZesjULzQkszwrOPmMU-h" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Table Manner", n: "Table Manner Session - Batch II.mov", i: "1Dy_-SEV5ARdrr5QXUmZavBT-rYxr2D4C" },
  
  // Cooking Experience
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Cooking Experiences", n: "Cooking Class - Ingredients Prep.mov", i: "1-Y-H0w2ljs1Eri5ncvP2adH0Pk80YPbm" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Cooking Experiences", n: "Cooking Class - Chef Demo.mov", i: "1daKYUJzU8sSavP5lrzFFXlooHV-Nvzy1" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Cooking Experiences", n: "Cooking Class - Hands On.mov", i: "1Qi9OP10LWsbn5zczovf7Pyawk-Y-R3-Z" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Cooking Experiences", n: "Cooking Class - Spices.mov", i: "1wFB65yEe-lxNqePeLJxmoxHkB1U8RsDF" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Cooking Experiences", n: "Cooking Class - Techniques.mov", i: "16g6hmM_80a6ER3hlo_Tcs_kiFb4ybylU" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Cooking Experiences", n: "Cooking Class - Plating.mov", i: "1qmKag4Z14hVVikZXSSk3HY77AToA_PF6" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Cooking Experiences", n: "Cooking Class - Tasting.mov", i: "1kG00DYaIIXB9y1pY2dALjno7a-7fl6IX" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Cooking Experiences", n: "Cooking Class - Final Dish.mov", i: "1ZacYNnyhXW0nY3JY0n4jvD_tDFAwbEXB" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Cooking Experiences", n: "Cooking Class - Group Photo.mov", i: "1xxJi4ASfavdQuf7coInr_5VPzHNNSLPK" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Cooking Experiences", n: "Cooking Class - Fun Moments.mov", i: "1jF58y8IcSoqsPh8hArD4wHJJQCYF2mu5" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Cooking Experiences", n: "Cooking Class - Certificate.mov", i: "1xk662ZNqzZrSeGxSViXv1vpVYpICvkfQ" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Cooking Experiences", n: "Cooking Class - Garden Tour.mov", i: "1S1kJFbarxLUE0-ZjN5aaj08c3-Rd2Spz" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Cooking Experiences", n: "Cooking Class - Balinese Paste.mov", i: "1DI1VFmKSxtsETGGNk05vLxEJja_7pX-0" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Cooking Experiences", n: "Cooking Class Highlight.mp4", i: "1KJhW2RPA0rEYHf1yNoRH4TIzoq1_B1Mh" },
  
  // Birthday
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Birthday Celebration", n: "Birthday Surprise - Group 1.mov", i: "1_CfqHSSuUz00DM11MbzdmOZkpZZaGH6y" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Birthday Celebration", n: "Birthday Surprise - Group 2.mov", i: "1idcKZoem-xlFcVSSCqNafWb0jba5aA9C" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Birthday Celebration", n: "Birthday Celebration - Ms Cates.mov", i: "1I8hMuugcs9frgieTTWlh99QCdeQVIwNg" },
  { p: "/Tapa Agung View By Pramana/Edelweiess Restaurant/Birthday Celebration", n: "Birthday Celebration - Mr Bone.mov", i: "1JPK8jEb9-8MAE2rgHre5UVTyc9tml_W6" },
  
  // New Gallery Photos (DJI = Aerial)
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO", n: "Aerial View - Resort Panorama.jpg", i: "1z1Ilb0c8JtKOAHepYHs1n7i5w3_y90mG" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO", n: "Aerial View - Valley Mist.jpg", i: "1qRofwsnOZaaqoUzA6EsPncl_2aVM_P6u" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO", n: "Aerial View - Sunrise.jpg", i: "1akTEDxDpW_4-OvOLzG7nGHR0OOWpDsky" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO", n: "Aerial View - Bamboo Roofs.jpg", i: "12VgU0o11nMz44ZI2uf7gUJmDW5izhbcq" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO", n: "Aerial View - Green Surroundings.jpg", i: "1_f-LPWZUNiDhD9H9oQwc4SFjSiYl_2Ok" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO", n: "Aerial View - Mount Agung.jpg", i: "1jk7DrtPeVIZCNfpamNWz1lRvBFdMNTrS" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO", n: "Aerial View - Rice Terraces.jpg", i: "1E8txywSo5hJP9nHUVrqy647kN6Ve2wnR" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO", n: "Aerial View - Resort Layout.jpg", i: "1QGROp13XXAVuCVKw_l1MtDcPpaPb5V_i" },
  
  // Front Office / Lobby (FO)
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/FO", n: "Lobby Entrance.jpg", i: "124aKC0CoHKSYJtyshihW-ATgS4jE3S0M" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/FO", n: "Reception Desk.jpg", i: "1bF8Mq5a5KfYaSvIHwEUQVIKjlj-XUDxu" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/FO", n: "Welcome Area.jpg", i: "1wRSM8S2v3ygAfn27-4jMpEB8H9VGMRIY" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/FO", n: "Front Office Detail 1.jpg", i: "18cXTCGdS5F0KmmSB0i1CgE_z28sK2zmV" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/FO", n: "Front Office Detail 2.jpg", i: "1uB3ubEyzKq_uJbY8rUey_vS3h6jBsQYZ" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/FO", n: "Front Office Detail 3.jpg", i: "1LreHbFgx7FM7HhvyREPzn0Sd8AtLTDOt" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/FO", n: "Guest Waiting Area.jpg", i: "1ME7aN4vZTw2ACv_U2yVeuv1Bc8j4cm6F" },
  
  // Deluxe Room Gallery
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Deluxe Room", n: "Deluxe Room - Bed Setup.jpg", i: "1-INQj7uUWMXOvvDNbzaI4A81fJlYZ2JI" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Deluxe Room", n: "Deluxe Room - Balcony View.jpg", i: "1E9Dfxfc2Y7tqLWWlTvmthylN1gPDVvYA" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Deluxe Room", n: "Deluxe Room - Amenities.jpg", i: "1Pj0BspYhFVMuIReAZmuI97cS6i-oHtlj" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Deluxe Room", n: "Deluxe Room - Interior.jpg", i: "136xG2gDUJPN7RYgRvrVgVqBxO_BQL_5I" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Deluxe Room", n: "Deluxe Room - Bathroom.jpg", i: "1MNYmRWCpKKfuy09upSzjUjeXwlZGGxhZ" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Deluxe Room", n: "Deluxe Room - Wardrobe.jpg", i: "1ITbmMixkqe8iIwt15qNBTnx65_z4T19h" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Deluxe Room", n: "Deluxe Room - Seating Area.jpg", i: "1E8WFFQEr_QCtE4yCEQ465K-p1UnZnWRJ" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Deluxe Room", n: "Deluxe Room - Overview.jpg", i: "1RMbVtI9KGOiz6i4QMtOhLTD6uDn6n3Uk" },
  
  // Activity Gallery
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Activity", n: "Guest Activity - Trekking.jpg", i: "1xNKaIva9hhOXuqDEMhsmi9jR0qT1hK_R" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Activity", n: "Guest Activity - Cycling.jpg", i: "1rSAZKbkixn3dSXikqMHeDWcUZUiZz0j0" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Activity", n: "Guest Activity - Yoga.jpg", i: "10W0lI1VZb_DS00JHnoD7dVGCL6suXJcm" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Activity", n: "Guest Activity - Cooking.jpg", i: "1Y_FrOQeRDYWiQeTKLUkxNkyCovNTtrt3" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Activity", n: "Guest Activity - Offering Making.jpg", i: "1DNC6tBB9kcT3ulSkdFj1KLsalW8VSi89" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Activity", n: "Guest Activity - Rice Field Walk.jpg", i: "1l5XqQozHrDvCWEiY3ZCxqiNOzRruxAGg" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Activity", n: "Guest Activity - Village Tour.jpg", i: "12JyZi1SkEdqFQI6zhZiZXiNy1f1Zumn6" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Activity", n: "Guest Activity - Nature Walk.jpg", i: "1QZOP0CLK56w-DHDhInVmj7_3VRF6FSTv" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Activity", n: "Guest Activity - Morning Walk.jpg", i: "1YCiD4tultkBhaYSj7Lt-lYwaNBv2HoGP" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Activity", n: "Guest Activity - Garden Tour.jpg", i: "1OpieAqGT_TTUJ6avIeafDkO_OH_rbUb_" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Activity", n: "Guest Activity - Spa.jpg", i: "14uYs6HUfCO-f3T2lB-FOfUZf5Wh3AyMI" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Activity", n: "Guest Activity - Relaxation.jpg", i: "1Jghvi_mgz9-A0AFXuMxWdksRs-XJf9pa" },
  
  // Restaurant Gallery (General)
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Buffet Setup.jpg", i: "1xdx5A9Q-SZMGqudtsrxJgoYe0vxJ2OzO" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Outdoor Seating.jpg", i: "16w4RYHpVM-y6fEXcBVQowSV61A2Ta0Ic" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - View.jpg", i: "1E76n5WDjE3xQz9hc0OFxRvcCnheNdF_M" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Interior Detail.jpg", i: "1dsilB0SoDYzX5ye-jzAjG9nhTZ8VuFMi" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Evening Atmosphere.jpg", i: "1Ay8q2ydyX62IU8yP3CznjCyl62QFPFyC" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Table Setting.jpg", i: "1nKpjs3XLkBVp2OjseyqLKGp2FoQ-HBkn" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Bar Area.jpg", i: "1nGFPGCpz9C7XVGmThTHUgDtIqXg2UMwv" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Dining Hall.jpg", i: "1G5brSko5j7Occk7xg_YNksnj0LQsRU13" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Breakfast Service.jpg", i: "1uh8ukTQLcuJp9opTQDIc_HPu6337huFH" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Lunch Service.jpg", i: "1M2KBof3CdHClZ-M0gIqEoIFZqHuLUTEd" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Dinner Service.jpg", i: "1fXdy5Ys5J4kXjlsCIv3A8a9VU6fBAsdX" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Chef at Work.jpg", i: "1ej3yhMBotVSex3Z8fe4rhyonw6SUFLs_" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Dessert Corner.jpg", i: "1Tlu6i7Mqfo147hBwnvGqfiCOuiVl7Ug1" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Fresh Juice Bar.jpg", i: "1mQWoa0Nwc7IOcypwQDnG-ZtMcmEXs2Wj" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Coffee Station.jpg", i: "116TqPPOzSZ6tKeA5eWdwvTxyQ83p7I63" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Terrace.jpg", i: "12rQ5kOavivmYT2vWZXSctoPRKlKUd545" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Group Seating.jpg", i: "139MoLmKfPbh3bCJoPXyi-2huywatR1Da" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Romantic Setup.jpg", i: "1nRrYU2-exn8QOgsuNjJwLZMOkw3-VvQf" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Family Setup.jpg", i: "1hxvVSCHPpTYKMifMsTZUe3vqerpoyWu4" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Restaurant", n: "Restaurant - Overview.jpg", i: "1WAuGuR-4wRSWrpv_f0bWIJhhjthUGq6T" },
  
  // Staff
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Staff", n: "Our Team - Service.jpg", i: "1TvNENAixgQkPgKz0lcZShAxMmtrqD5Xi" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Staff", n: "Our Team - Kitchen.jpg", i: "1xDVJNFEkf3xo55jD_w_Aj38C2cTKV4wB" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Staff", n: "Our Team - Front Office.jpg", i: "13J0KgkITmTtlRC9dLmB0YikHlXHe2OiI" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Staff", n: "Our Team - Housekeeping.jpg", i: "1tWROgMb70eMJh-1lFK6E47LwTBoWW4y_" },
  
  // Areal / Grounds
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Main Pathway.jpg", i: "1f8UUqO4SEgZR-z0MB7GhRyrqpRCmmHCW" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Garden View.jpg", i: "1OY309Ityz18SBxyaL11CXwg5Uue516K8" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Bamboo Architecture.jpg", i: "1FulePg8-ErvEahYjQaGA0CxSbhwsLFYW" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Evening.jpg", i: "1VP3klMRd8-t0smb40IAeUnoRfk9VMITr" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Morning Mist.jpg", i: "1t3yc8TG2lELG5dv3NyOulsOODXuXNuQJ" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Walkway.jpg", i: "1-oc4wmAZjbCK4qhCON-Yrf6MvDB5DteN" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Flora.jpg", i: "1Z7VSAytV5GINyXOVMQL0lNsUxV-ipNLV" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Detail.jpg", i: "1Oa2iposdcix5RjxUgNeqkASDSOZzDrqr" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Landscape 1.jpg", i: "18gOZ1_WI7VXcnR3_17I-K2PoSjXo5ZOD" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Landscape 2.jpg", i: "171lEUP8ESN02wzIulfqOQuNdN2_A0ZYV" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Landscape 3.jpg", i: "1FLUQRh3hvnGcl0E9zPvWyBdl-gPmM3NW" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Landscape 4.jpg", i: "1TgJJYcm3sflfHtK3Cpeyg0l1vM1cHWjA" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Landscape 5.jpg", i: "1aOup6cw7kkGduZTwJontrHQYzRmZi7nW" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Architecture Detail 1.jpg", i: "1iBQBO7W1S8xqaCNDaDKdso_9ml9-xnIJ" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Architecture Detail 2.jpg", i: "1UmFUDqQ_2rpoV3qcO84gNvt5SgN1w_wJ" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Architecture Detail 3.jpg", i: "1ZCCDYsAkEYBQUBVEHFAj4kRBNSc5sZmH" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Architecture Detail 4.jpg", i: "1h6mS2u5J6LVFgbYDVrOt3hJildgxq2AX" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Architecture Detail 5.jpg", i: "14qLZuYJDGxf328-JJUd-sHnuBW8Yy6OI" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Architecture Detail 6.jpg", i: "1QCzShTQMwVsy_FsaSVhGslutbemC8zQZ" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Exterior Wide.jpg", i: "1O76psj9OWKy_f7j7dTbMePKKekMWeWQL" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Exterior Detail 1.jpg", i: "1X8Hm9Ci-On0sVuRpYADHlsB-0DvsN1Rw" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Exterior Detail 2.jpg", i: "15hQzNMhzKKTnChDwD2mmTht8NN4k9Fos" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Enhanced View.jpg", i: "1bDE7DV5GcCw5j2716juX1zoEj1QfBxIw" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Pathway 1.jpg", i: "1HZbN3zH4LWSNBLL_c4KFbbY-H2WHA2bM" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Pathway 2.jpg", i: "12TtjNISGYrKesUiSoRB1epSqGk4_bzzR" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Pathway 3.jpg", i: "1BNUGZvxj0XCPWpBWk3NK7I55o2yaTZQH" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Pathway 4.jpg", i: "1WGm1RyT02N8df_hU4zvNiZ2jJa1drSg9" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Pathway 5.jpg", i: "1k-UuKRWpCbTseZwQOf7tUiDxfoRQU1qE" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Pathway 6.jpg", i: "1PcMJjiyByx3iWndCt6qIOyjfgH6GWrL5" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Pathway 7.jpg", i: "1_yJ9rI2mPeQfrxTp-stZpcaGhWro-UTP" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Pathway 8.jpg", i: "1qvHkUj47hOVa0xqYobXXh2wYMCccwHLE" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Pathway 9.jpg", i: "1tavZU_57oJSDsGtpo6i7ubfb-4be1aZY" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Areal", n: "Resort Grounds - Pathway 10.jpg", i: "16DnR19Xz2_aJw0U_EhxjZO5xIvllocUx" },
  
  // Standard Room
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Standar Room", n: "Standard Room - Bed Setup.jpg", i: "1NdtSqXRts6exa3LudYtH2Y_jxM48Ef9G" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Standar Room", n: "Standard Room - Interior.jpg", i: "192uY_YJaKGVIymYQ-eTVJ8MNzRxt6l8B" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Standar Room", n: "Standard Room - Detail 1.jpg", i: "1mCKRQ_HXDW7h1xm3aI4w-pUCkq_-kasR" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Standar Room", n: "Standard Room - Detail 2.jpg", i: "1vIqxcge5VMrIn2inRYzNKDOue97yPg5L" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Standar Room", n: "Standard Room - Detail 3.jpg", i: "1JLlyOM_oogJyWnET56e-EKP3w6iaSBN3" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/New/GALLERY PHOTO/Standar Room", n: "Standard Room - Detail 4.jpg", i: "1UJWfhqMEjE4lVkWFmaWUYvcVjlKbCndq" },
  
  // Mountain View
  { p: "/Tapa Agung View By Pramana/TAV Photo/Mountain View", n: "Panoramic Resort View.jpg", i: "1MZhbg4kG6YaBDavuADr4dIGoGjCtD2AU" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Mountain View", n: "Panoramic Resort View 2.jpg", i: "1h7C1WeayBBfNgc8mxxfArJdX2NuCneGi" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Mountain View", n: "Majestic Mount Agung View.jpg", i: "1L-4SX6lx1VuA-vwD0hBlHe1jJp1abIY1" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Mountain View", n: "Majestic Mount Agung View 2.jpg", i: "1ySb9q-45yqDcPUTgSW-WtWip2LuhzxVc" },
  
  // Hotel Area Duplicates/Renames (Using same logic as Gallery Areal)
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 1.jpg", i: "12dwH0wGnTErBYiHS0LJAfar6WO0e5sF3" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 2.jpg", i: "1PCM8YbwEu-ie1TTvB7Zhs0pHwK0WddKU" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 3.jpg", i: "1zL7DxtzdsPA4bTv0AvezVyz7s5dPYxkW" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 4.jpg", i: "1zaXfcS3nt-rVrpDyTg--LjwFCPtLsdpo" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 5.jpg", i: "1JcM_2ny6M3z5ulBgKkFlVWeVpqT9SLob" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 6.jpg", i: "1VUKOnMUJsbT1H_S6V-tyl395sEQz41mv" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 7.jpg", i: "1af5p-awOvT-UqPNXwVMIzHCCRVmUXG2K" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 8.jpg", i: "19o792K4y8wwP3neZ1wkyHDZ-dA_iol4D" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 9.jpg", i: "1zmJFHVfsy8YVkLPdpebTB5jR58MWp-EX" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 10.jpg", i: "1FcFIv6evDRsbphNBpLOdAETfMSZFWRRC" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 11.jpg", i: "1UHKPLbfWn89drrqAGF0SMga0DHr_Nj_O" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 12.jpg", i: "16yhDZ3TMr1T1cv9hdDHgED4IqcFPsnCD" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 13.jpg", i: "1RYSvh3DCN54MzuPUTy2lwqPwj7_VJKSV" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 14.jpg", i: "1XwER9EcLUOaTuo-jKFgyoiF8umQD0Rb-" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 15.jpg", i: "1y9vJb09Nqws5x6lK2DgboSBQUtWd0b3U" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 16.jpg", i: "1Zdd647G1V1_4y5TZVlCWxaW_UOYzYC9e" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 17.jpg", i: "1chGlenVt6Nqgt2DW5Msg3D6t8gHBsjDZ" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 18.jpg", i: "12V7VgYWtHUMiRUO8Tf90uB8oAbiAv6SQ" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 19.jpg", i: "1j_-VGCMaBC2DLqAN3KLNGDLWQbuR31mt" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 20.jpg", i: "1DFAC_eRArPYHCVsgfV4bEBBTpD6WW92M" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 21.jpg", i: "1eb4_QqsUVC4WWi4cc5iRWSCb7MRmPFOy" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 22.jpg", i: "16E5CSPTWojfcT17dWkq3Zp24jks8e-fi" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 23.jpg", i: "11swQTZbESs_w7VHtfCu3Zj29hiaZppYj" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 24.jpg", i: "1tsmIHavv1DyuDL60ZGWL1obiGAx20-t7" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 25.jpg", i: "1sHFg3epom9PIr0kOd_fnp6H7GAWv1nnj" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 26.jpg", i: "1IhbTORLY1YWcVRmG1gx6BRPzj2fLqpTH" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 27.jpg", i: "158EJ-6oBXVHYPhS0D7UpEE5YpzjOX1SC" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 28.jpg", i: "1sl-cKKsHt_KMPDPvzDY5y6V4XkYt7i4c" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 29.jpg", i: "14SjPCfGcHaxlAB6hvNWKAn5UCxM4wwiY" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 30.jpg", i: "1XFJyBG37r9o2sHhBZ5gLzqTOOOYYl_to" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 31.jpg", i: "1ci0t-aqxM3RJ2JXytbh0ijabrsh1IpFA" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 32.jpg", i: "1_0YcUw_QT74GpJrMbnixdgSIzRURJqzM" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Areal", n: "Resort Aerial - 33.jpg", i: "1tkEU0LrXb-Di0r8sFIUnZc4DmpcGoJLI" },
  
  // Infinity Pool
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Infinity Pool", n: "Infinity Pool - Day View.jpg", i: "1H36h0svMwbmUoH1H7OaUIzzP5FrwVHbV" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Infinity Pool", n: "Infinity Pool - Relaxing.jpg", i: "1guU00BrBfpYdJRLiNHHOtuut5c9iZ1XW" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Infinity Pool", n: "Infinity Pool - Panorama 1.jpg", i: "1L95xPOg56gOy0mNJIs3DGq4MTQNCySQo" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Infinity Pool", n: "Infinity Pool - Panorama 2.jpg", i: "1sWZZWZdO-rVPfoqSqmYLnP_2dPPzGR-m" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Infinity Pool", n: "Infinity Pool - Aerial.png", i: "1gqygFldx5JQpmbrBMNX4kY-4g2FobvuH" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Infinity Pool", n: "Infinity Pool - Sunset.jpg", i: "1i5jOcbVgx5thM_t3bn-qgWQ0zdpadT3C" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Infinity Pool", n: "Infinity Pool - Morning.jpg", i: "1welIboZmQ7uLtlN92f2i_yfOTjUOcHSk" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Infinity Pool", n: "Infinity Pool - Wide Angle.jpg", i: "11bioHZ4dEGj8l2q6jarwfVU-DB1YD2HI" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Infinity Pool", n: "Infinity Pool - Deck View.jpg", i: "1J8EcKBuj5rYbyXTcK6jsCKE4rdRJvyLx" },
  
  // Spa Room
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Spa Room", n: "Spa Room - Couple Treatment.jpg", i: "1Brs_inLNwbMkeB7wsXRyeo8mZ6DImujt" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Spa Room", n: "Spa Room - Atmosphere.jpg", i: "1mGdwtEa3GJvwnePt4SY_h3hadSZOCpbK" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Spa Room", n: "Spa Room - Setup.jpg", i: "1K8fKP1niRce2BvhFeV8s1H_WzEa-_RkN" },
  
  // Meeting Room
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Meeting Room", n: "Meeting Room - Theater Style.jpg", i: "1BUWUUeqW-e_H6Mr3FXievGSmu9VinNjg" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Meeting Room", n: "Meeting Room - U Shape.jpg", i: "1q5Tl9BYrVdDBcijp3v8V9piAFFTjp6rS" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Meeting Room", n: "Meeting Room - Classroom.jpg", i: "1ZSwJLA6U8Jj_rHdbZnH8tmIvadMP8okp" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Meeting Room", n: "Meeting Room - Boardroom.jpg", i: "1ytqusmToLLjDdL1sQ2Doa0Uf4MunwDh4" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Meeting Room", n: "Meeting Room - Detail.jpg", i: "1PRuwDS1w3Lpgby5UA6ISi1Vd1kpv8DgM" },
  
  // Kitchen
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Kitchen", n: "Kitchen - Prep Area.jpg", i: "1z6-f_8UTeV8a0lqJrtH-CxaEjNMC4Q2z" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Kitchen", n: "Kitchen - Cooking Station.jpg", i: "1ku9DzCrr3rOWT_34QhEOdi9g8zSeVBIw" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Kitchen", n: "Kitchen - Chef Team.jpg", i: "15vxQ3zuP-7BX3dWiRyDLpO3UFQqNNAU0" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Kitchen", n: "Kitchen - Hygiene.jpg", i: "1A2bi8f-C1ndHcjAuI3kl6aKBvKY-aA4W" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Kitchen", n: "Kitchen - Equipment.jpg", i: "11fcvrbwgXh783MTMriXiR7TkHr9PFuq1" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Kitchen", n: "Kitchen - Plating Area.jpg", i: "1VATbGCne1PHIHF72rrajl4jFDegbW8iF" },
  
  // Security Pos
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Security Pos", n: "Security Post - Entrance.jpg", i: "1xhHeES9NLd23lSy1fmTBMwZOdkZXCfzV" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Security Pos", n: "Security Post - Main Gate.jpg", i: "1aOWMHFeRbiTFD0hfjsB6WLafHoS9ZRIi" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Security Pos", n: "Security Post - View 1.jpg", i: "1yOyGHCgPNNDjPUG_LPCPzDNEEHRl24CR" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Hotel Area/Security Pos", n: "Security Post - View 2.jpg", i: "1XDdMQvn1ukv6sJ1DGhI7INIzGYh6O8oK" },
  
  // Suites
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Suite", n: "Suite Room - Balcony View.heic", i: "1-EH2S1qfQCW0w3I4d_QS9-sGr2iBsweV" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Suite", n: "Suite Room - Bedroom.heic", i: "1SnG8qbWnWcJkn9GZuqR_4p0G99-3WVNR" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Suite", n: "Suite Room - Living Area.heic", i: "1JzaVMpe4LuMALDQ6IrP0hAapv_LE7vVu" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Suite", n: "Suite Room - Bathroom.heic", i: "1ZkSPoR2CC4SmlSqsvn9KwddswMcrUftz" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Suite", n: "Suite Room - Detail.heic", i: "15-pOwSFzTaa0RQhooaTyMWuawWq-CXCe" },
  
  // Deluxe Mountain View
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Deluxe Room With Mountain View", n: "Deluxe Mountain View - Room.jpg", i: "1cOqAPGvsr8IkgzNZhVjE_Okbj3IAY-Iv" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Deluxe Room With Mountain View", n: "Deluxe Mountain View - Bathroom.jpg", i: "1YnzlX5zL8q2CwmgrykOk92hU7rHEq3_w" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Deluxe Room With Mountain View", n: "Deluxe Mountain View - Overview.jpg", i: "1Eu2W3JtnQYqvxkZcj5Lc3fJHLdkzrCbW" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Deluxe Room With Mountain View", n: "Deluxe Mountain View - Bed.jpg", i: "1COJ0YGw1LfuH4ckytLmha4GV-KqMC1Ff" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Deluxe Room With Mountain View", n: "Deluxe Mountain View - Terrace.jpg", i: "1DcqecxAbBiPmItVeK0Hf2325YXKh6071" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Deluxe Room With Mountain View", n: "Deluxe Mountain View - Detail 1.jpg", i: "1FHvSXw_OY7e89om6hadhEErua-c4BUy3" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Deluxe Room With Mountain View", n: "Deluxe Mountain View - Detail 2.jpg", i: "1GS9m6ZN5ChBfvRKsNE7S40ol-vlOYQQl" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Deluxe Room With Mountain View", n: "Deluxe Mountain View - Detail 3.jpg", i: "1Nml665hqsiHGorJA42XO6z9HOEfDPiqy" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Deluxe Room With Mountain View", n: "Deluxe Mountain View - Detail 4.jpg", i: "1jyzfwH1yvJZ9ufs9aKUCQ0VTN_TTPeEk" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Deluxe Room With Mountain View", n: "Deluxe Mountain View - Detail 5.jpg", i: "1pU1MlojDhFl81Xrg0gnS-7hFtB8eIFYu" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Deluxe Room With Mountain View", n: "Deluxe Mountain View - Detail 6.jpg", i: "1zEVAbpgXKRgFAFVzZlM86NOmbDjLwMaR" },
  
  // One Bedroom Bungalow
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/One Bedroom Bungalow", n: "One Bedroom Bungalow - Exterior.jpg", i: "16T1rCy6J2rGWNRBLqFr8j2rJJmaHiMeg" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/One Bedroom Bungalow", n: "One Bedroom Bungalow - Bathroom.jpg", i: "1H8VO09IhYo1IVZ-UP-DuVE9NqinT4BbL" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/One Bedroom Bungalow", n: "One Bedroom Bungalow - Bedroom 1.jpg", i: "1806z6dfB0Ow_tEwpqGyeFkYkUTfE8QC4" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/One Bedroom Bungalow", n: "One Bedroom Bungalow - Bedroom 2.jpg", i: "1D53HjEHJw9YGYC2M4H_H7OakmzroIdIP" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/One Bedroom Bungalow", n: "One Bedroom Bungalow - Bedroom 3.jpg", i: "1Do9aVpoAJVA-W6YGX_Ode4ca6ogrfYal" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/One Bedroom Bungalow", n: "One Bedroom Bungalow - View.jpg", i: "1L4ajrNRshxYbxtnaYOiMh7UrEQ1BcHZ3" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/One Bedroom Bungalow", n: "One Bedroom Bungalow - Terrace.jpg", i: "1Q_T0GCN52rmZ8SlZDXM2HBSdnpYiqMiO" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/One Bedroom Bungalow", n: "One Bedroom Bungalow - Detail.jpg", i: "1XBFrqew97AYuZWX9y3XIAxcj0_uhCLhb" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/One Bedroom Bungalow", n: "One Bedroom Bungalow - Night.jpg", i: "1iNKbbhaekLZjDCLTcgYns8GrsqeFFKsz" },
  
  // Standard Garden View
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Standard Room With Garden View", n: "Standard Garden View - Room.jpg", i: "143QcrGvjxisIMXyCgO8jGVTffqD9QZpT" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Standard Room With Garden View", n: "Standard Garden View - Bathroom.jpg", i: "1DamBGqQpybF6g3lQ-Q0s1hG3aSvOoeK6" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Standard Room With Garden View", n: "Standard Garden View - Overview.jpg", i: "1wwkbrCk4YcDrHXPWrv4A0Skeg6W4WiRs" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Standard Room With Garden View", n: "Standard Garden View - Detail 1.jpg", i: "132M6GDGLQA6-KogL3ppsWH930sp3SoR8" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Standard Room With Garden View", n: "Standard Garden View - Detail 2.jpg", i: "1872MBNaGhZ1iqTAfPcgvxBPRJITvyfHn" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Standard Room With Garden View", n: "Standard Garden View - Detail 3.jpg", i: "1CSJMCaYQqf58sxaj5l2ikOWNB1cCcHHR" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Standard Room With Garden View", n: "Standard Garden View - Detail 4.jpg", i: "1YJODU4HK4bobvh2QbVvyhUxmmb2le61s" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Standard Room With Garden View", n: "Standard Garden View - Detail 5.jpg", i: "1ahruCybDKC78_sJePV5uiHdMUxohVJBl" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Standard Room With Garden View", n: "Standard Garden View - Detail 6.jpg", i: "1rI89ixAp1BAmUrpc8jjgw4JLRmyPbzG5" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Standard Room With Garden View", n: "Standard Garden View - Detail 7.jpg", i: "1vnOhC2h5dAGuHr0eAJLRc3o8ylEZdNX5" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Standard Room With Garden View", n: "Standard Garden View - Detail 8.jpg", i: "1w54LVL9NOJTGOHzeVnmKyP0n0jpQI-ba" },
  { p: "/Tapa Agung View By Pramana/TAV Photo/Room Category/Standard Room With Garden View", n: "Standard Garden View - Detail 9.jpg", i: "1xd_gC-dJLmk623HnkXXpZLxk1sEhIabS" },
  
  // TAV Video
  { p: "/Tapa Agung View By Pramana/TAV Video", n: "Samsara Highlight Video.mp4", i: "1d9_WJ6Rhhp4mbX-2MykokTFX26tnRxR_" },
  { p: "/Tapa Agung View By Pramana/TAV Video", n: "Tapa Agung Experience.mp4", i: "1yP9Ld4BpwBNEYH0seq1kHiz_Ma4EZi0S" },
  
  // Info
  { p: "/Tapa Agung View By Pramana/TAV Information", n: "Hotel Directory.pdf", i: "1WOX2QLHEVsIvDoamQkx7ytX6I-GUyjBn" },
  { p: "/Tapa Agung View By Pramana/TAV Information", n: "House Rules.pdf", i: "1pIKz2t1lsLO4CbvOq3GqXWzXjYMgJHTy" },
  { p: "/Tapa Agung View By Pramana/TAV Information", n: "Fact Sheet.pdf", i: "1Hl-IutqAvwQ1Ztgh84vEPQICHvM0ZhFu" },
];

export const ALL_FILES: FileData[] = rawData.map(file => ({
  path: cleanPath(file.p),
  name: file.n,
  id: file.i,
  type: getType(file.n),
  thumbnail: `https://drive.google.com/thumbnail?id=${file.i}&sz=w800`,
  // Use large thumbnail for full size to avoid 403/Cookie issues with drive.google.com/uc?export=view
  fullSize: `https://drive.google.com/thumbnail?id=${file.i}&sz=w2048`
}));