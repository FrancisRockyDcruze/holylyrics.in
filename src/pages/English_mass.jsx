import { useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import SelectLanguage from "../components/SelectLanguage";

export default function EnglishMass ()
{
    const navigate = useNavigate();
    const [showLanguages, setShowLanguages] = useState(false);

    return (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
            <div className="p-4 flex justify-between items-center border-b bg-bgColor">
            <SelectLanguage/>
            
            <h2 className="text-2xl text-bglightColor font-bold mr-3 md:text-5xl lg:text-5xl">Holy Mass</h2>
            <div className="text-xl text-bgColor border rounded px-3 py-0 bg-bglightColor" onClick={() => navigate("/")}>🏠︎</div>
            </div>

            <div className="p-4 flex flex-col space-y-2 bg-bglightColor mb-3 overflow-y-auto flex-1">
                <h1 className="font-bold text-2xl text-center py-2 md:text-4xl md:py-4 lg:text-5xl">The Order of Mass</h1>

                <div>
                    <h1 className="font-bold text-lg pt-2 md:text-4xl md:py-4 lg:text-4xl">SIGN OF THE CROSS</h1>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold md:text-2xl md:py-2 lg:text-2xl">Priest:</span> In the name of the Father, and of the Son, and of the Holy Spirit</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold md:text-2xl md:py-2 lg:text-2xl">People:</span>  Amen.</p>
                </div>
                
                <div>
                    <h1 className="font-bold text-lg pt-2 md:text-4xl md:py-4 lg:text-4xl">GREETING</h1>
                    One of the following is used.

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> The grace of our Lord Jesus Christ, and the love of God,
                    and the communion of the Holy Spirit be with you all. Or:</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> Grace to you and peace from God our Father and the Lord Jesus Christ. Or:</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> The Lord be with you.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> And with your Spirit.</p>
                </div>

                <div>
                    <p className="pt-3"><span className="font-bold md:text-4xl md:py-4 lg:text-4xl">PENITENTIAL ACT</span></p>
                    <p className="py-2">The priest invites the faithful to the Penitential Act. A brief silence is followed by one of the following:</p>
                    <p className="pb-3 md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">All say:</span> I confess to almighty God
                    and to you, my brothers and sisters,
                    that I have greatly sinned,
                    in my thoughts and in my words,
                    in what I have done and in what I have failed to do,
                    (and, striking their breast, they say: )
                    through my fault, through my fault,
                    through their most grievous fault;
                    therefore I ask blessed Mary ever-Virgin,
                    all the Angels and Saints,
                    and you, my brothers and sisters,
                    to pray for me to the Lord our God.</p>
                </div>

                <div>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> Have mercy on us, O Lord.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> For we have sinned against you.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> Show us, O Lord, your mercy.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> And grant us your salvation.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> You were sent to heal the contrite of heart:</p>
                    Lord, have mercy.
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Lord, have mercy</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> You came to call sinners:</p>
                    Christ have mercy.
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Christ have mercy.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> You are seated at the right hand of the Father to intercede for us.</p>
                    Lord, have mercy. 
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Lord, have mercy</p>
                </div>
                
                <div>
                    <p className="font-bold pt-3">The absolution by the Priest follows:</p>
                    <p><span className="font-bold">Priest:</span> May almighty God have mercy on us, forgive us our sins, and bring us to everlasting life.</p>
                    <p><span className="font-bold">P.</span> Amen</p>

                    <p>Lord, have mercy invocations may follow:</p>

                    <p><span className="font-bold">Priest:</span> Lord, have mercy. Or</p>
                    <p><span className="font-bold">P.</span> Lord, have mercy. Or</p>
                    <p><span className="font-bold">Priest:</span> Christ, have mercy. Or</p>
                    <p><span className="font-bold">P.</span> Christ, have mercy. Or</p>
                    <p><span className="font-bold">Priest:</span> Lord, have mercy. Or</p>
                    <p><span className="font-bold">P.</span> Lord, have mercy. Or</p>
                </div>

                <div>
                    <p className="font-bold py-2 md:text-4xl md:py-4 lg:text-4xl">THE GLORIA</p>
                    <p className="font-bold">When indicated, either sung or said:</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl">
                        Glory to God in the highest,
                        and on earth peace to people of good will.
                        We praise You, we bless You,
                        we adore You, we glorify You,
                        we give You thanks for your great glory,
                        Lord God heavenly King,
                        O God, almighty Father.
                        Lord Jesus Christ, Only Begotten Son,
                        Lord God, lamb of God, Son of the Father,
                        you take away, the sins of the world,
                        have mercy on us,
                        you take away the sins of the world,
                        receive our prayer,
                        you are seated at the right hand of
                        the Father, have mercy on us.
                        For you alone are the Holy One,
                        you alone are the Lord,
                        you alone are the Most high,
                        Jesus Christ,
                        with the Holy Spirit,
                        in the glory of God the Father.
                        Amen
                    </p>
                </div>

                <div>
                    <p className="font-bold pt-3 md:text-4xl md:py-4 lg:text-4xl">THE COLLECT</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest</span> Let us pray.</p>
                    <p className="font-bold">All pray in silence with the priest who says the Collect prayer, at the end of which:</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Amen</p>
                </div>

                <div>
                    <p className="font-bold pt-3 md:text-4xl md:py-4 lg:text-4xl">THE LITURGY OF THE WORD</p>
                    <p className="font-bold">All sit. By hearing the word proclaimed in worship, the faithful again enter into the unending dialogue with God. A brief time of quiet after the readings enables those present to take the word of God to heart.</p>

                    <p className="font-bold pt-3 md:text-4xl md:py-4 lg:text-4xl">FIRST READING</p>
                    <p className="font-bold">To indicate the end of these readings, the reader acclaims:</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold pt-3">Reader.</span>The word of the Lord</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Thanks be to God.</p>
                
                    <p className="font-bold pt-3 md:text-4xl md:py-4 lg:text-4xl">PSALM</p>
                    <p className="font-bold">The psalmist or cantor sings or says the psalm, the people make the response.</p>

                    <p className="font-bold pt-3 md:text-4xl md:py-4 lg:text-4xl">SECOND READING</p>
                    <p className="font-bold">On Sundays and certain other days there is a second reading.</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold pt-3">Reader.</span>The word of the Lord</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Thanks be to God.</p>
                </div>

                <div>
                    <p className="font-bold pt-3 md:text-4xl md:py-4 lg:text-4xl">GOSPEL</p>
                    <p className="font-bold">All stand to sing the Acclamation welcoming the Gospel.</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> The Lord be with you.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> And with your spirit.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> A reading from the holy Gospel according to N.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Glory to you, O Lord</p>

                    <p className="font-bold">At the end of the Gospel:</p>

                    <p className="md:text-4xl md:py-4 lg:text-4xl"><span className="font-bold">Priest:</span> The Gospel of the Lord</p>
                    <p className="md:text-4xl md:py-4 lg:text-4xl"><span className="font-bold">P.</span> Praise to you, Lord Jesus Christ.</p>

                    <p className="font-bold">After the Gospel all sit.</p>
                </div>

                <div>
                    <p className="font-bold pt-3 md:text-4xl md:py-4 lg:text-4xl">THE HOMILY</p>
                    <p className="font-bold">After the Homily there may be a brief silence for recollection. All stand.</p>

                    <p className="font-bold pt-3 md:text-4xl md:py-4 lg:text-4xl">NICENO - CONSTANTINOPOLITAN CREED</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl">I believe in one God, the Father almighty
                    maker of heaven and earth,
                    of all things visible and invisible.
                    I believe in one Lord Jesus Christ,
                    the Only Begotten Son of God,
                    born of the Father before all ages.
                    God from God, Light from Light,
                    true God from true God,
                    begotten, not made, consubstantial with the Father,
                    through him all things were made.
                    For us men and for our salvation
                    he came down from heaven, (all bow)
                    and by the Holy Spirit was incarnate of the Virgin Mary,
                    and became man.
                    For our sake he was crucified under Pontius Pilate,
                    he suffered death and was buried,
                    and rose again on the third day
                    in accordance with the Scriptures.
                    He ascended into heaven
                    and is seated at the right hand of the Father.
                    He will come again in glory
                    to judge the living and the dead
                    and his kingdom will have no end.
                    I believe in the Holy Spirit, the Lord the giver of life,
                    who proceeds from the Father and the Son,
                    who with the Father and the Son is adored and glorified,
                    who has spoken through the prophets.
                    I believe in one, holy, catholic and apostolic Church.
                    I confess one Baptism for the forgiveness of sins
                    and I look forward to the ressurection of the dead
                    and the life of the world to come.  Amen.</p>
                </div>

                <div>
                    <p className="font-bold pt-3 md:text-4xl md:py-4 lg:text-4xl">THE APOSTLES CREED</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl">I believe in God the Father almighty,
                    Creator of heaven and earth,
                    and in Jesus Christ, his only son, our Lord, (all bow)
                    who was conceived by the Holy Spirit,
                    born of the Virgin Mary,
                    suffered under Pontius Pilate,
                    was crucified, died and was buried:
                    he descended into hell;
                    on the third day he rose again from the dead,
                    he ascended into heaven,
                    and is seated at the right hand of God
                    the Father almighty,
                    from there he will come to judge the living and the dead.
                    I believe in the Holy Spirit,
                    the holy catholic Church,
                    the communion of saints,
                    the forgiveness of sins,
                    the resurrection of the body,
                    and life everlasting,  Amen.</p>

                    <p className="font-bold py-3">After each intention there is a pause while the faithful pray. The Priest concludes the Prayer with a collect. All sit.</p>
                </div>
                
                <div>
                    <p className="font-bold pt-3 md:text-4xl md:py-4 lg:text-4xl">THE LITURGY OF THE EUCHARIST</p>
                    <p className="font-bold">During the Offertory Song the faithful bring forward bread and wine for the celebration of the Eucharist. The Priest offers prayers of blessing:</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> Blessed are you, Lord God of all creation, for through your goodness we have received the bread we offer you:
                    fruit of the earth and work of human hands, it will become for us the bread of life.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Blessed be God for ever.</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> Blessed are you, Lord God of all creation, for through your goodness we have received the wine we offer you:
                    fruit of the vine and work of human hands, it will become our spiritual drink.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Blessed be God for ever.</p>

                    <p className="font-bold">The Priest completes additional personal preparatory rites, all stand:</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> Pray, brethren (brothers and sisters),
                    that my sacrifice and yours
                    may be acceptable to God,
                    the almighty Father.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> May the Lord accept the sacrifice at your hands
                    for the praise and glory of his name,
                    for our good
                    and the good of all his holy Church.</p>

                    <p className="font-bold">Then the Priest says the Prayer over the Offerings, at the end of which:</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span>Amen</p>
                </div>

                <div>
                    <p className="font-bold pt-3 md:text-4xl md:py-4 lg:text-4xl">The EUCHARISTIC PRAYER</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> The Lord be with you.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> And with your spirit.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> Lift up your hearts.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> We lift them up to the Lord.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> Let us give thanks to the Lord our God.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> It is right and just.</p>

                    <p className="font-bold">After the Preface, the people sing or say:</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl">Holy, Holy, Holy Lord God of hosts.<br></br>
                    Heaven and earth are full of your glory.
                    Hosanna in the highest.
                    Blessed is he who comes in the name of the Lord.
                    Hosanna in the highest.</p>

                    <p className="font-bold">All kneel. The Priest continues with the Eucharistic Prayer. After the words of Consecration:</p>
               
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> The mystery of faith.</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl">We proclaim your Death, O Lord,
                    and profess your Resurrection
                    until you come again, Or:
                    When we eat this Bread and drink this Cup,
                    we proclaim your Death, O Lord,
                    until you come again, Or:
                    Save us, saviour of the world,
                    for by your Cross and Resurrection
                    you have set us free.</p>

                    <p className="font-bold">At the conclusion of the prayer:</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> Through him, and with him, and in him,
                    O God, almighty Father,
                    in the unity of the Holy Spirit,
                    all glory and honour is yours,
                    for ever and ever.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span>Amen</p>
                </div>

                <div>
                    <p className="font-bold pt-3 md:text-4xl md:py-4 lg:text-4xl">THE COMMUNION RITE</p>
                    <p className="font-bold">All stand and the Priest says:</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> At the Saviour’s command
                    and formed by divine teaching,
                    we dare to say:</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Our Father, who art in heaven,
                    hallowed by thy name,
                    thy kingdom come
                    thy will be done
                    on earth as it is in heaven.
                    Give us this day our daily bread,
                    and forgive us our trespasses,
                    as we forgive those who trespass
                    against us;
                    and lead us not into temptation,
                    but deliver us from evil.</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> Deliver us, Lord we pray, from every evil,
                    graciously grant peace in our days,
                    that, by the help of your mercy,
                    we may be always free from sin
                    and safe from distress,
                    as we await the blessed hope
                    and the coming of our saviour, Jesus Christ.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> For the kingdom,
                    the power and the glory are yours
                    now and for ever.</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> Lord Jesus Christ,
                    who said to your Apostles:
                    Peace I leave you, my peace I give you;
                    look not on our sins,
                    but on the faith of your Church,
                    and graciously grant her peace and unity
                    in accordance with your will.
                    Who live and reign for ever and ever.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Amen.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> The peace of the Lord be with you always.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> And with your spirit.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> Let us offer each other the sign of peace.</p>

                    <p><span className="font-bold">All offer one another the customary sign of peace.</span></p>

                    <p className="md:text-4xl md:py-4 lg:text-4xl"><span className="font-bold">BREAKING OF THE BREAD</span></p>
                    <p>During which is sung or said:</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Lamb of God, you take away the sins of
                    the world, have mercy on us.
                    Lamb of God, you take away the sins
                    of the world, have mercy on us.
                    Lamb of God, you take away the sins of
                    the world, grant us peace.</span></p>

                    <p className="font-bold">All kneel.</p>
                </div>

                <div>
                    <p className="font-bold pt-3 md:text-4xl md:py-4 lg:text-4xl">INVITATION TO COMMUNION</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> Behold the Lamb of God,
                    behold him who takes away the sins of the world.
                    Blessed are those called to the supper of the Lamb.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Lord, I am not worthy
                    that you should enter under my roof,
                    but only say the word
                    and my soul shall be healed.</p>

                    <p className="font-bold">Communicants come forward in reverent procession; they receive Holy Communion standing.</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> The Body of Christ.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Amen</p>

                    <p className="font-bold">When Communion is ministered under both kinds:</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> The Blood of Christ.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Amen</p>

                    <p className="font-bold">After Communion, the Priest says:</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> Let us pray.</p>

                    <p className="font-bold">All stand and pray in silence. The Priest says the prayer after Communion, at the end of which</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Amen</p>
                </div>

                <div>
                    <p className="font-bold pt-3 md:text-4xl md:py-4 lg:text-4xl">THE CONCLUDING RITES</p>
                    <p className="font-bold">Any brief announcements follow here. Then the dismissal.</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> The Lord be with you.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> And with your spirit.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">Priest:</span> May almighty God bless you,
                    the Father and the Son and the Holy Spirit.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Amen</p>

                    <p className="font-bold">Then the Deacon, or the Priest:</p>

                    <p className="md:text-2xl md:py-2 lg:text-2xl">Go forth, the Mass is ended. Or:
                    Go and announce the Gospel of the Lord. Or:
                    Go in peace, glorifying the Lord by your life. Or:
                    Go in peace.</p>
                    <p className="md:text-2xl md:py-2 lg:text-2xl"><span className="font-bold">P.</span> Thanks be to God</p>
                </div>
            <Footer/>
            </div>
        </div>
    )
} 