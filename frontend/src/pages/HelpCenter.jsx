import React, { useState } from 'react';
import { Home, ChevronLeft } from 'lucide-react';
import ringsize from '../assets/img/ringsize.png';
import banglesize from '../assets/img/banglesize.png';
import jcare from '../assets/img/jcare.png';
import gold_bis from '../assets/img/gold_bis.png';
import diamonds_cs from '../assets/img/diamonds_cs.png';
import silver_bis from '../assets/img/silver_bis.png';
import gems from '../assets/img/gems.png';

const HelpCenter = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedTopic, setSelectedTopic] = useState(null);

  const sections = [
    { id: 'guides', label: 'Jewelry Guides' },
    { id: 'education', label: 'Jewelry Education' },
    { id: 'policies', label: 'Our Policies' },
    {id:  'terms', label: 'Terms and Disclaimer'},
  ];

  const topics = {
    guides: [
      { 
        id: 1, 
        title: 'Jewelry Care Guide', 
        content: (
          <>
            <p className="help"><b>Proper care will help you enjoy your jewelry for generations. Follow these tips:</b></p>
            <h4>Gold Jewelry Care</h4>
            <p className="help">Gold jewelry requires proper care to maintain its shine and beauty over time. Here are some tips for preserving your gold pieces:</p>
            <ul>
              <li>Avoid exposure to chemicals like chlorine, bleach, and perfumes as they can cause damage or discoloration.</li>
              <li>Store gold jewelry separately in soft cloth bags or padded boxes to prevent scratches and tangling.</li>
              <li>Clean your gold pieces with warm water, mild soap, and a soft cloth. Avoid using abrasive cleaners.</li>
              <li>Remove gold jewelry before strenuous activities such as swimming or exercising to prevent damage.</li>
              <li>For best results, have your gold jewelry professionally cleaned and polished annually to maintain its luster.</li>
            </ul>
            <br />
            <h4>Silver Jewelry Care</h4>
            <p className="help">Silver jewelry and articles can tarnish over time, but with proper care, you can keep them shining:</p>
            <ul>
              <li>Store silver pieces in anti-tarnish bags or lined jewelry boxes to prevent tarnishing from air exposure.</li>
              <li>Polish silver regularly with a specialized silver cleaning cloth to maintain its brilliance.</li>
              <li>Clean silver jewelry with warm water and mild soap, then dry it immediately with a soft cloth.</li>
              <li>Avoid wearing silver jewelry in chlorinated water or when applying perfumes and lotions, as these can cause tarnishing.</li>
              <li>If silver becomes heavily tarnished, have it professionally cleaned for the best results.</li>
            </ul>
            <br />
            <h4>Diamond Jewelry Care</h4>
            <p className="help">Diamond jewelry requires special attention to maintain its brilliance and sparkle:</p>
            <ul>
              <li>Avoid touching diamonds directly with your fingers, as oils can dull their shine.</li>
              <li>Clean diamonds with a soft toothbrush, warm water, and mild detergent to remove dirt and oils.</li>
              <li>Store diamond jewelry separately in soft pouches or boxes to prevent scratches to other jewelry.</li>
              <li>Have your diamond pieces checked by a professional annually to ensure the stones are secure in their settings.</li>
              <li>Remove diamond rings and bracelets during intense physical activities to prevent accidental damage.</li>
            </ul>
            <br />
            <h4>Necklace Care</h4>
            <p className="help">Necklaces, especially delicate ones, require proper handling to prevent tangling and damage:</p>
            <ul>
              <li>Always clasp necklaces when storing them to avoid tangling.</li>
              <li>Store necklaces in individual compartments or hang them to prevent scratches and kinks.</li>
              <li>Avoid wearing necklaces in water or while applying perfumes and lotions.</li>
              <li>Clean necklaces with a soft cloth and avoid abrasive cleaners.</li>
              <li>For fragile chains, consider professional cleaning and inspections to ensure durability.</li>
            </ul>
            <br />
            <h4>Ring Care</h4>
            <p className="help">Since rings are often worn daily, they require extra care to keep them looking their best:</p>
            <ul>
              <li>Remove rings when using harsh chemicals, cleaning products, or cooking to avoid residue buildup.</li>
              <li>Store rings individually in soft pouches or jewelry boxes to prevent scratches.</li>
              <li>Clean rings regularly with warm water and mild soap, using a soft toothbrush to remove dirt.</li>
              <li>Avoid wearing rings during manual labor or sports to prevent bending or damage to the band.</li>
              <li>Inspect ring settings regularly to ensure stones remain secure and do not loosen.</li>
            </ul>
            <br />
            <h4>Bangle Care</h4>
          <p className="help">Bangles are delicate and can easily get scratched or deformed if not properly cared for:</p>
          <ul>
            <li>Avoid stacking bangles tightly, as this can cause them to scratch each other.</li>
            <li>Store bangles separately in padded boxes or soft pouches to prevent scratches.</li>
            <li>Clean bangles with a soft cloth and avoid abrasive cleaners to maintain their shine.</li>
            <li>Remove bangles before engaging in strenuous activities to prevent bending or deformation.</li>
            <li>Polish your bangles regularly to keep them looking shiny and new.</li>
          </ul>
          <br />
          <h4>Earring Care</h4>
          <p className="help">Proper care for earrings is important, especially for maintaining their shape and cleanliness:</p>
          <ul>
            <li>Remove earrings before showering, swimming, or applying perfumes to avoid exposure to chemicals.</li>
            <li>Store earrings in individual compartments or soft pouches to avoid scratching and tangling.</li>
            <li>Clean earrings regularly with a soft cloth to remove dirt and oils, especially for gemstone earrings.</li>
            <li>Check earring backs and fasteners regularly to ensure they are secure and to prevent loss.</li>
            <li>For gemstone earrings, have them inspected by a jeweler annually to ensure settings remain secure.</li>
          </ul>
          <br />
          <h4>Silver Article Care</h4>
          <p className="help">Silver articles, such as utensils and decor, need special care to avoid tarnishing and maintain their beauty:</p>
          <ul>
            <li>Store silver articles in anti-tarnish cloth or lined boxes to minimize air exposure.</li>
            <li>Polish silver articles with a soft cloth and use silver polish to remove tarnish as needed.</li>
            <li>Wash silver utensils with warm water and mild detergent, and dry them immediately to prevent water spots.</li>
            <li>Avoid exposing silver articles to acidic foods or liquids that can cause discoloration.</li>
            <li>For heavily tarnished items, professional cleaning may be required to restore their shine.</li>
          </ul>
          </>
        ),
        imageUrl: jcare // Replace with actual image path
      },
      { 
        id: 2, 
        title: 'Ring Size Guide', 
        content: 'Find your perfect ring size:',
        table: [
          ['Ring Size (Indian)', 'Diameter (Inches - MM)'],
          ['1', '0.51 - 13.1(mm)'],
          ['2', '0.52 - 13.3(mm)'],
          ['3', '0.54 - 13.7(mm)'],
          ['4', '0.55 - 13.9(mm)'],
          ['5', '0.56 - 14.3(mm)'],
          ['6', '0.58 - 14.7(mm)'],
          ['7', '0.59 - 15.1(mm)'],
          ['8', '0.60 - 15.3(mm)'],
          ['9', '0.61 - 15.5(mm)'],
          ['10', '0.63 - 15.9(mm)'],
          ['11', '0.64 - 16.3(mm)'],
          ['12', '0.65 - 16.5(mm)'],
          ['13', '0.67 - 16.9(mm)'],
          ['14', '0.68 - 17.3(mm)'],
          ['15', '0.69 - 17.5(mm)'],
          ['16', '0.71 - 17.9(mm)'],
          ['17', '0.71 - 18.1(mm)'],
          ['18', '0.73 - 18.5(mm)'],
          ['19', '0.74 - 18.8(mm)'],
          ['20', '0.75 - 19.2(mm)'],
          ['21', '0.76 - 19.4(mm)'],
          ['22', '0.78 - 19.8(mm)'],
          ['23', '0.79 - 20.0(mm)'],
          ['24', '0.80 - 20.4(mm)'],
          ['25', '0.81 - 20.6(mm)'],
          ['26', '0.83 - 21.0(mm)'],
          ['27', '0.84 - 21.4(mm)'],
          ['28', '0.85 - 21.6(mm)'],
          ['29', '0.87 - 22.0(mm)'],
          ['30', '0.88 - 22.3(mm)']
        ],
        imageUrl: ringsize // Replace with actual image path
      },
      { 
        id: 3, 
        title: 'Bangle Size Guide', 
        content: 'Choose the right bangle size:',
        table: [
          ['Bangle Size (Indian)', 'Circumference (Inches - MM)'],
          ['2.2', '6.68 - 169.7(mm)'],
          ['2.4', '7.07 - 179.6(mm)'],
          ['2.6', '7.46 - 189.5(mm)'],
          ['2.8', '7.85 - 199.4(mm)'],
          ['2.10', '8.24 - 209.3(mm)'],
          ['2.12', '8.64 - 219.5(mm)'],
          ['2.14', '9.03 - 229.4(mm)'],
          ['3', '9.42 - 239.3(mm)']
                ],
        imageUrl: banglesize 
      },
    ],
    terms: [
      {
        id: 1,
        title: 'Website Disclaimer',
        content: (
          <>
            <p className="help">Our website is dedicated to providing live and historical prices of gold and silver, including bullion and customer retail rates. Prices displayed on this site may vary slightly based on different cities, states, and market conditions. We strive to keep the data accurate and updated, but we do not guarantee the complete accuracy of the prices at all times due to potential fluctuations in the market.</p>
            <p className="help">Please note, our website currently does not offer any online purchasing services. The information provided is for educational and informational purposes only. Users should verify prices with local dealers or market authorities before making any financial decisions based on the displayed prices.</p>
            <p className="help">We are not responsible for any discrepancies between the displayed prices and the actual market prices at any given time. By using this website, you agree to these terms and acknowledge that the prices shown may vary.</p>
          </>
        ),
      },
      {
        id: 2,
        title: 'Intellectual Property',
        content: (
          <>
            <p className="help">All content displayed on this website, including but not limited to text, images, logos, graphics, designs, and trademarks, constitutes our intellectual property, unless otherwise noted. Unauthorized use of our intellectual property is prohibited. You may download or print materials solely for personal, non-commercial purposes, as long as the original copyright and trademark notices remain intact.</p>
            <p className="help">Copying, reproducing, distributing, or creating derivative works based on our content for commercial use is strictly forbidden without obtaining prior written consent from us. Any breach of these terms may lead to legal consequences and compensation claims for damages incurred.</p>
            <p className="help">We respect intellectual property rights and expect users to do the same. If you believe any content on our site violates copyright laws, please contact us with relevant details so we can take appropriate action.</p>
          </>
        ),
      },
      {
        id: 3,
        title: 'Purchase Eligibility',
        content: (
          <>
            <p className="help">Currently, we do not offer products for purchase on our website. Users must be aware that the prices listed are for informational purposes only, and no purchases can be made online at this time. For future reference, users must be at least 18 years of age and capable of entering into legally binding contracts under applicable law to make purchases.</p>
            <p className="help">When online purchasing becomes available, we reserve the right to refuse service, terminate accounts, or cancel orders at our discretion, including but not limited to instances where we suspect fraudulent activity or a violation of these terms. If an order is cancelled, the user will be notified, and any charges will be refunded as per our policies.</p>
          </>
        ),
      },
      {
        id: 4,
        title: 'Pricing and Payments',
        content: (
          <>
            <p className="help">All prices displayed on the website are subject to change without prior notice, as they reflect live market conditions. Prices may vary slightly based on your geographic location and market factors specific to your area. The historical prices shown are for informational and educational purposes only.</p>
            <p className="help">Currently, no transactions or payments are processed on this site, as we do not offer online purchasing services. In the future, when online purchasing is available, all transactions within India will be processed in Indian Rupees (INR), including applicable taxes. Payment methods will vary based on the user's location and order amount.</p>
            <p className="help">For international cardholders, potential currency conversion fees may apply, and the final charge may vary based on exchange rates at the time of processing. We will always ensure that your payment information is processed securely to protect your data.</p>
          </>
        ),
      },
      {
        id: 5,
        title: 'PAN Card Requirement',
        content: (
          <>
            <p className="help">While our website currently does not process any transactions, when online purchasing becomes available, we will comply with Indian legal requirements, including the provision of a valid PAN card for purchases exceeding Rs. 2 lakhs. The following conditions will apply:</p>
            <ul>
              <li>Orders placed without valid PAN card information will be put on hold until verification is complete.</li>
              <li>The name on the billing information must exactly match the name on the provided PAN card for verification purposes.</li>
              <li>If PAN verification fails or is not completed within the specified time, we reserve the right to cancel the order and issue a full refund.</li>
            </ul>
            <p className="help">These requirements ensure compliance with Indian regulations and protect users from potential fraud in high-value transactions.</p>
          </>
        ),
      },
      {
        id: 6,
        title: 'Security',
        content: (
          <>
            <p className="help">You are prohibited from attempting to breach or violate the security of our website, which includes but is not limited to:</p>
            <ul>
              <li>Accessing data that is not intended for you or logging into a server or account for which you are not authorized.</li>
              <li>Attempting to probe, scan, or test the vulnerability of the website or its systems without proper authorization.</li>
              <li>Introducing viruses, malware, or any other harmful software that could disrupt or damage the website’s functionality.</li>
            </ul>
            <p className="help">Violations of system or network security may result in legal action, including civil or criminal liability. We reserve the right to investigate incidents and cooperate with law enforcement in prosecuting users who violate these terms.</p>
          </>
        ),
      }
    ],
    policies : [
      {
      id: 1,
      title: 'Exchange Policy',
      content: (
      <>
      <p className="help">We offer an easy exchange policy for our valued customers:</p>
      <ul>
      <li>Items can be exchanged within 15 days of purchase, provided they are unused and in their original condition with all paperwork, including the bill, product certificate (if given), and hallmarks.</li>
      <li>The exchange value will be based on the price at the time of purchase.</li>
      <li>This policy excludes certain items, including gold and silver coins/bars, customized ornaments, nose pins, and loose gemstones.</li>
      <li>Exchange requests can be processed through our WhatsApp chat or at our showroom.</li>
      <li>Exchanges will be completed within 3-7 business days, following a quality check of the returned product.</li>
      </ul>
      <p className="help">At our showroom, we only exchange products that are in good condition, with no significant wear and tear. The gold ornaments or silver articles must pass a quality check, and items with bends or breakages will not be accepted for exchange.</p>
      <p className="help">Within 14 days, a full refund can be processed. Beyond 14 days, the item is only eligible for buyback with another new item.</p>
      <p className="help">For returned products, the exchange value will be determined by their weight. Please note, making charges and GST will not be refunded.</p>
      </>
      ),
      },
      {
      id: 2,
      title: 'Buyback Policy',
      content: (
      <>
      <p className="help">We offer a flexible buyback policy, providing full value for eligible items:</p>
      <ul>
      <li>We provide 100% buyback for gold and silver items that are hallmarked. For non-hallmarked items, the purity will be tested, and the buyback will be processed accordingly.</li>
      <li>The buyback value for gold and silver items is based on the prevailing rates on the date of the buyback request.</li>
      <li>Jewelry will be valued based on its weight, and charges such as making charges or GST will not be included in the buyback value.</li>
      <li>The policy does not apply to customized products, coins, bars, and loose gemstones.</li>
      </ul>
      <h3>Fair Value Assessment:</h3>
      <p className="help">Our buyback policy ensures fair value for your jewelry and solitaire diamonds. The prevailing gold and platinum price in our retail store will be used to evaluate the product.</p>
      <h3>Approval and Evaluation:</h3>
      <p className="help">All exchange and buyback requests are subject to a quality check, which may take 3-7 business days, conducted by a certified laboratory as required.</p>
      <p className="help">Gurudatta Jewellers reserves the right to calculate the buyback amount based on a final evaluation by our quality check experts. The evaluation considers factors such as the condition, quality, and market value of the product.</p>
      <h3>Buyback Payments:</h3>
      <p className="help">Buyback payments will be made via account payee cheque or RTGS/NEFT, which may take 7-10 days. Payments will only be made to the customer listed on the invoice.</p>
      </>
      ),
      },
      {
      id: 3,
      title: 'Return & Refund Policy',
      content: (
      <>
      <p className="help">Our return and refund policy is limited and applies only in cases of a sale-side fault.</p>
      <ul>
      <li>Returns must be initiated within 7 days of purchase, and refunds will be processed to the original payment method.</li>
      <li>The product must be returned in its original condition with all paperwork, including the invoice and product certificate (if given).</li>
      <li>The prevailing price of gold will apply to the gold component of your jewelry, gold coin, or bar at the time of return.</li>
      </ul>
      </>
      ),
      },
      {
      id: 4,
      title: 'Valuation Table',
      table: [
        ['Category', 'Value'],
        ['Coins', '100% of Published rate'],
        ['Gold Jewellery', '100% of Published rate'],
        ['Stone Jewellery', '100% of Published gold rate reducing stones weight and costs'],
        ['Silver Articles', '100% of Published rate'],
        ['Diamond Jewellery', '100% of Published gold rate and 90% invoice value of Diamond'],
        ['Uncut Jewellery', '100% of Published gold rate and 80% invoice value of Uncut Diamond'],
        ['Making Charge, Other Stones, and GST', 'No exchange value'],
              ],
      content: (
      <>
      <p className="help">* <b>Used stones will have no exchange or buyback value</b></p>
      </>
      ),
      },
      {
      id: 5,
      title: 'Document Requirements',
      content: (
      <>
      <p className="help">To sell gold, customers must provide any of the following identity proofs:</p>
      <ul>
      <li>Electoral ID</li>
      <li>Aadhaar Card</li>
      <li>Drivin g License</li>
      <li>Passport</li>
      <li>PAN Card</li>
      </ul>
      <p className="help">For exchange or buyback of custom-made or altered products, only the "Exchange after 14 days of purchase" and "Buyback" policies will apply.</p>
      </>
      ),
      },
      ],
         
    education: [
      { 
        id: 1, 
        title: 'About Gold', 
        content: (
          <>
            <p className="help">Gold is a precious and historically significant metal, often used in jewelry due to its natural beauty, luster, and malleability. The purity of gold is measured in carats, with 24 carat being pure gold. However, pure gold is too soft for everyday wear, which is why it is alloyed with other metals like copper and silver to create 22K (91.6% gold) and 18K (75% gold) options that are more durable and practical for jewelry.</p>
            
            <p className="help"><strong>24K Gold:</strong> The purest form of gold (99.9%) with a deep yellow color. It is rarely used in jewelry due to its softness.</p>
            <p className="help"><strong>22K Gold:</strong> Contains 22 parts gold and 2 parts alloy, making it more durable while still retaining the rich color of gold. This is a common choice for Indian wedding jewelry.</p>
            <p className="help"><strong>18K Gold:</strong> Composed of 18 parts gold and 6 parts alloy, it is sturdier and often used in contemporary designs, including white gold and rose gold jewelry.</p>
    
            <p className="help"><strong>Hallmarking:</strong> In India, hallmarking is a certification system that ensures the purity of gold. The BIS (Bureau of Indian Standards) hallmark certifies that the gold meets national standards. The introduction of HUID (Hallmark Unique Identification) further strengthens this system by offering traceability for every piece of jewelry.</p>
            
            <p className="help"><strong>Gold Colors:</strong> While yellow gold is the most traditional, white gold and rose gold are popular modern options. White gold is created by alloying gold with metals like palladium or silver and is often coated with rhodium for a shiny finish. Rose gold contains copper, giving it a warm, pink hue.</p>
            
            <h3>Frequently Asked Questions:</h3>
            <ul>
              <li><strong>What is the significance of gold carats?</strong> Carats represent the purity of gold. Higher carat gold, like 24K, is softer but purer, while lower carats, like 18K, are stronger due to the alloy content.</li>
              <li><strong>What is the HUID in gold hallmarking?</strong> HUID is a unique identification number assigned to each piece of gold jewelry under the BIS hallmarking scheme, ensuring authenticity and traceability.</li>
              <li><strong>Can I wear 24K gold jewelry every day?</strong> Due to its softness, 24K gold is not ideal for daily wear. Opt for 22K or 18K gold for better durability in everyday use.</li>
              <li><strong>How can I maintain my gold jewelry?</strong> Avoid exposing gold to harsh chemicals, store it separately to prevent scratches, and clean it with warm water and mild detergent.</li>
              <li><strong>What is the difference between 24K, 22K, and 18K gold?</strong> 24K gold is 99.9% pure and the softest, making it less ideal for daily wear. 22K gold is 91.6% pure, more durable but still soft, often used in Indian jewelry. 18K gold is 75% pure, mixed with alloys, and is stronger, commonly used for diamond jewelry.</li>
              <li><strong>What is HUID and BIS Hallmark?</strong> HUID (Hallmark Unique Identification) is a six-digit unique code assigned to every piece of hallmarked gold jewelry. BIS (Bureau of Indian Standards) Hallmark is a certification of purity given by the Indian government to ensure that consumers get the correct gold quality.</li>
              <li><strong>Is rose gold more valuable than yellow or white gold?</strong> Rose, yellow, and white gold have the same value if they are of the same karat, as the gold content is identical. The difference is in the alloys mixed to achieve the color.</li>
              <li><strong>Why does gold jewelry sometimes tarnish?</strong> Gold jewelry with lower karat (such as 18K) can tarnish over time due to the alloys mixed with it reacting to air, moisture, or chemicals.</li>
              <li><strong>Can I wear gold jewelry every day?</strong> Yes, but it's better to wear 18K or 22K gold daily, as it's stronger due to the alloy mix. Pure 24K gold is softer and more prone to scratches.</li>
            </ul>
          </>
        ),
        imageUrl: gold_bis,
      },
      { 
        id: 2, 
        title: 'About Silver', 
        content: (
          <>
            <p className="help">Silver is a versatile and highly reflective metal used in jewelry, often alloyed for added strength. The most common form of silver used in jewelry is <strong>sterling silver</strong>, which consists of 92.5% pure silver and 7.5% other metals (usually copper), making it more durable than pure silver.</p>
            
            <p className="help"><strong>.925 Sterling Silver:</strong> Marked with a .925 stamp, sterling silver is recognized for its quality and durability. It’s more affordable than gold but still offers a timeless, elegant look. Silver jewelry like anklets, chains, and rings are popular choices in India.</p>
    
            <p className="help"><strong>Authenticity:</strong> When purchasing silver, look for the .925 stamp or a hallmark to ensure it is genuine sterling silver. Be wary of imitations like silver-plated items.</p>
            
            <p className="help">While silver is prone to tarnishing, it can easily be restored to its original shine with regular cleaning and proper storage. Sterling silver jewelry, with its alloyed content, often holds up better against everyday wear compared to pure silver.</p>
    
            <p className="help"><strong>Workmanship:</strong> Sterling silver is more expensive than regular silver due to the detailed craftsmanship involved in creating fine pieces of jewelry. Intricate designs and the polishing process add to its value.</p>
            
            <h3>Frequently Asked Questions:</h3>
            <ul>
              <li><strong>What is the difference between sterling silver and pure silver?</strong> Sterling silver is an alloy containing 92.5% silver, making it more durable than pure silver, which is soft and more prone to damage.</li>
              <li><strong>How can I identify genuine sterling silver?</strong> Look for the .925 stamp or an authorized hallmark. Authentic sterling silver will also tarnish over time, but this can be cleaned.</li>
              <li><strong>Why is sterling silver more expensive?</strong> The added durability, craftsmanship, and higher silver content make sterling silver more valuable than lower-grade or silver-plated alternatives.</li>
              <li><strong>How can I prevent my silver jewelry from tarnishing?</strong> Store silver in a dry, airtight container or anti-tarnish pouch, and avoid exposing it to chemicals and moisture.</li>
              <li><strong>How can I tell if silver is real?</strong> Look for a hallmark such as 925 or sterling, which indicates genuine silver. You can also use a magnet test; silver is not magnetic, so if it's attracted to a magnet, it's not pure silver.</li>
              <li><strong>What is the difference between fine silver and sterling silver?</strong> Fine silver is 99.9% pure but too soft for jewelry. Sterling silver is 92.5% pure and mixed with other metals like copper for durability, making it the preferred choice for jewelry.</li>
              <li><strong>Why is sterling silver more expensive than other types of silver?</strong> Sterling silver's higher cost is due to its durability, purity, and craftsmanship involved. It maintains its appearance and is highly suitable for fine jewelry.</li>
              <li><strong>How do I clean my silver jewelry?</strong> Use a soft cloth and a silver cleaning solution or a mixture of baking soda and water. Avoid harsh chemicals that can tarnish or scratch the metal.</li>
              <li><strong>What causes silver to tarnish?</strong> Silver reacts with sulfur in the air, forming a black layer of tarnish. Humidity, exposure to chemicals, and improper storage can accelerate this process.</li>

            </ul>
          </>
        ),
        imageUrl: silver_bis,
      },
      { 
        id: 3, 
        title: 'About Diamond', 
        content: (
          <>
            <p className="help">Diamonds are prized for their brilliance and rarity. The quality of a diamond is evaluated using the 4Cs: Cut, Clarity, Color, and Carat weight, all of which contribute to its value and appearance.</p>
            
            <p className="help"><strong>Cut:</strong> The cut of a diamond influences how light is reflected, affecting its brilliance. Popular cuts include round, princess, and cushion. A well-cut diamond will sparkle more than a poorly cut one, even if they have the same carat weight.</p>
            <p className="help"><strong>Clarity:</strong> Clarity refers to the presence of imperfections (inclusions) in the diamond. The clarity scale ranges from Flawless (no visible inclusions) to Included (visible inclusions that may affect the appearance and durability).</p>
            <p className="help"><strong>Color:</strong> Diamond color is graded from D (colorless) to Z (light yellow or brown). Colorless diamonds are the most valuable, while diamonds with noticeable tints are less expensive.</p>
            <p className="help"><strong>Carat:</strong> Carat refers to the weight of the diamond. One carat equals 0.2 grams. Larger diamonds are rarer and more valuable, but carat weight should be considered alongside cut, clarity, and color when choosing a diamond.</p>
    
            <h3>Frequently Asked Questions:</h3>
            <ul>
              <li><strong>What is the most important factor when choosing a diamond?</strong> While all 4Cs are important, many experts prioritize cut since it directly impacts the diamond's brilliance.</li>
              <li><strong>Are colorless diamonds better?</strong> Colorless diamonds (D-F) are the most valuable, but near-colorless diamonds (G-J) can also appear white when mounted in jewelry and offer better value.</li>
              <li><strong>How can I verify the quality of a diamond?</strong> Look for certification from reputable gemological laboratories such as GIA or IGI, which provide unbiased grading reports on the 4Cs.</li>
              <li><strong>Does diamond clarity matter?</strong> Clarity affects the visibility of inclusions. For most jewelry, diamonds with VS1 to SI2 clarity provide a good balance between beauty and cost.</li>
              <li><strong>What is diamond fluorescence?</strong> Fluorescence refers to a diamond's tendency to glow under UV light. Some diamonds show a blue hue, which can enhance or detract from their appearance depending on the intensity.</li>
              <li><strong>What is the most important 'C' when buying a diamond?</strong> While all 4 Cs (Cut, Clarity, Color, and Carat) are important, cut is often considered the most crucial as it directly impacts the diamond's sparkle and brilliance.</li>
              <li><strong>Can I tell the difference between a diamond with a higher or lower clarity?</strong> For most people, inclusions are not visible to the naked eye in diamonds with a clarity rating of VS2 or higher. Lower clarity grades may show visible imperfections, but they are often minor.</li>
              <li><strong>What is a diamond certificate?</strong> A diamond certificate, also called a grading report, provides an objective assessment of a diamond's 4 Cs. Reputable labs like GIA and IGI issue these reports to ensure quality.</li>
              <li><strong>What is fluorescence in a diamond?</strong> Fluorescence refers to how a diamond reacts to ultraviolet (UV) light. Some diamonds exhibit a bluish glow under UV light, which can sometimes affect their appearance in daylight.</li>
              <li><strong>What is the difference between a lab-grown diamond and a natural diamond?</strong> Lab-grown diamonds are created in a controlled environment using the same processes that form natural diamonds. They are chemically and physically identical but are often less expensive and considered more ethical.</li>
            </ul>
          </>
        ),
        imageUrl: diamonds_cs
      },
      { 
        id: 4, 
        title: 'About Gemstones', 
        content: (
          <>
            <p className="help">Gemstones are a diverse group of minerals prized for their color, rarity, and beauty. Commonly used gemstones include sapphires, rubies, emeralds, and topaz, each with unique qualities.</p>
      
            <p className="help"><strong>Sapphires:</strong> Known for their rich blue color, sapphires are durable and symbolize wisdom and royalty. They also come in other colors like pink and yellow.</p>
            <p className="help"><strong>Rubies:</strong> Valued for their intense red hue, rubies symbolize passion and strength. High-quality rubies are rare and often more expensive than diamonds of the same size.</p>
            <p className="help"><strong>Emeralds:</strong> These vibrant green gemstones are treasured for their color and rarity. However, they are more fragile due to inclusions that are common in natural emeralds.</p>
            <p className="help"><strong>Topaz:</strong> Known for its wide range of colors, from blue to pink to yellow, topaz is a versatile and affordable gemstone option for various types of jewelry.</p>
      
            <h3>Navratnas: Special Significance in India</h3>
            <p className="help">Navratnas, or the nine gemstones, hold a special place in Indian tradition and astrology. Each gemstone is associated with a celestial body and believed to bring balance and protection to the wearer. The Navratnas include:</p>
            <ul>
              <li><strong>Ruby</strong> (Sun)</li>
              <li><strong>Pearl</strong> (Moon)</li>
              <li><strong>Coral</strong> (Mars)</li>
              <li><strong>Emerald</strong> (Mercury)</li>
              <li><strong>Yellow Sapphire</strong> (Jupiter)</li>
              <li><strong>Diamond</strong> (Venus)</li>
              <li><strong>Blue Sapphire</strong> (Saturn)</li>
              <li><strong>Hessonite Garnet</strong> (Rahu)</li>
              <li><strong>Cat’s Eye</strong> (Ketu)</li>
            </ul>
            <p className="help">Wearing all nine gemstones together is believed to offer protection against negative energies and balance the planetary influences in a person’s life. Navratnas are often set in rings, pendants, or bracelets in traditional Indian jewelry, and are worn for their astrological benefits as well as their beauty.</p>
      
            <h3>Frequently Asked Questions:</h3>
            <ul>
              <li><strong>What should I look for in a gemstone?</strong> Consider color, clarity, and cut when choosing a gemstone. Bright, vibrant colors with fewer inclusions tend to be more valuable, but personal preference plays a big role in gemstone selection.</li>
              <li><strong>Are synthetic gemstones real?</strong> Synthetic gemstones have the same chemical and physical properties as natural gemstones, but they are created in laboratories. They are a more affordable alternative to natural stones.</li>
              <li><strong>How do I care for gemstone jewelry?</strong> Each gemstone has different hardness and durability. It’s important to clean them with warm, soapy water and avoid exposure to harsh chemicals. Store gemstones separately to avoid scratches.</li>
              <li><strong>What are birthstones?</strong> Birthstones are gemstones associated with each month of the year. For example, garnet for January, amethyst for February, and sapphire for September. Many people choose birthstone jewelry for its symbolic and personal significance.</li>
              <li><strong>How can I tell if a gemstone is real?</strong> Gemstones can be authenticated by professional gemologists, who use tools like refractometers and microscopes to assess their properties. Purchasing from reputable sellers with proper certification ensures authenticity.</li>
              <li><strong>How can I tell if a gemstone is natural or synthetic?</strong> Synthetic gemstones are created in labs but share the same chemical properties as natural ones. Always ask for certification, and look for visual cues—natural stones often have inclusions, while synthetics are nearly flawless.</li>
              <li><strong>What is the difference between a treated and untreated gemstone?</strong> Treated gemstones undergo processes like heat or dye to enhance their color or clarity. Untreated gemstones are rarer and often more valuable.</li>
              <li><strong>Why are some gemstones more expensive than others?</strong> Rarity, size, and color quality significantly affect the price of a gemstone. For instance, rare stones like rubies and sapphires command higher prices than more common gems like amethyst.</li>
              <li><strong>What is the birthstone tradition?</strong> Birthstones are gems associated with each month of the year. For example, garnet is the birthstone for January, while sapphire is for September. Wearing your birthstone is believed to bring good luck.</li>
              <li><strong>How do I care for my gemstone jewelry?</strong> Different gemstones have varying hardness and durability. Clean your gemstone jewelry with a soft brush and soapy water, and store it separately to avoid scratches.</li>
            </ul>
          </>
        ),
        imageUrl: gems,
      },
    ]
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    setSelectedTopic(null);
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const renderContent = () => {
    if (activeSection === 'home') {
      return (
        <div className="home-content">
          {sections.map((section) => (
            <button key={section.id} className="section-button" onClick={() => handleSectionClick(section.id)}>
              {section.label}
            </button>
          ))}
        </div>
      );
    }

    if (selectedTopic) {
      return (
        <div className="topic-content">
          <button className="back-button" onClick={() => setSelectedTopic(null)}>
            <ChevronLeft size={24} />
            Back
          </button>
          <h2>{selectedTopic.title}</h2>
          {selectedTopic.imageUrl && (
            <img src={selectedTopic.imageUrl} alt={selectedTopic.title} className="topic-image" />
          )}
          <div className="topic-body">
            {selectedTopic.content}
          </div>
          {selectedTopic.list && (
            <ul className="topic-list">
              {selectedTopic.list.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          {selectedTopic.table && (
            <div className="table-container">
              <table className="topic-table">
                <thead>
                  <tr>
                    {selectedTopic.table[0].map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedTopic.table.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="topic-grid">
        {topics[activeSection].map((topic) => (
          <button key={topic.id} className="topic-card" onClick={() => handleTopicClick(topic)}>
            <h3>{topic.title}</h3>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="jewelry-help-center">
      <div className="header_help">
        <button className="home-button" onClick={() => handleSectionClick('home')}>
          <Home size={24} />
        </button>
        <h1>Jewelry Help Center</h1>
      </div>
      {renderContent()}
    </div>
  );
};

export default HelpCenter;