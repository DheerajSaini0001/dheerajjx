const asyncHandler = require('express-async-handler');
const Story = require('../models/Story');

// Default seed so the first GET always returns something meaningful
const DEFAULT_STORY = {
    highlights: [
        { icon: '🎯', label: 'Vision', value: 'Build experiences that matter', color: 'from-pink-500 to-rose-500', glow: 'hover:shadow-pink-500/20' },
        { icon: '🌙', label: 'Style', value: 'Dark, bold, and unapologetic', color: 'from-violet-500 to-purple-600', glow: 'hover:shadow-violet-500/20' },
        { icon: '📸', label: 'Craft', value: 'Storytelling through content', color: 'from-blue-500 to-cyan-500', glow: 'hover:shadow-blue-500/20' },
        { icon: '🔥', label: 'Energy', value: 'Relentless & fiercely creative', color: 'from-amber-500 to-orange-500', glow: 'hover:shadow-amber-500/20' },
    ],
    chapters: [
        { order: 0, title: 'Not Built Overnight', lines: ["I wasn't built in comfort.", 'I was built in moments no one saw.', '', 'In quiet rooms.', 'In long nights.', 'In battles that never made it to social media.'] },
        { order: 1, title: 'The Process of Becoming', lines: ['There was a time I waited —', 'for clarity,', 'for confidence,', 'for the "right moment."', '', 'Clarity comes from action.', 'Confidence comes from discipline.', 'The right moment is created — not found.'] },
        { order: 2, title: 'The Invisible Growth', lines: ['Growth is strange.', '', "It doesn't always feel exciting.", 'Sometimes it feels lonely.', '', 'But every doubt shaped my resilience.', 'Every setback sharpened my mindset.', 'Every challenge forced me to level up.'] },
        { order: 3, title: 'The Shift', lines: ['At some point, I realized:', '', 'You can either be controlled by your circumstances', 'or you can control your response to them.', '', 'I chose ownership.'] },
        { order: 4, title: 'Who I Am Now', lines: ["I'm not perfect.", "I'm not finished.", '', "I'm evolving.", '', 'I believe in depth over noise.', 'Discipline over motivation.', 'Progress over attention.'] },
        { order: 5, title: 'Why This Space Exists', lines: ['This space is not here to show perfection.', '', "It's here to show the journey.", '', 'The growth.', 'The lessons.', 'The mindset shifts.', 'The evolution.'] },
        { order: 6, title: 'The Promise to Myself', lines: ['No matter how far I go —', 'I will never stop becoming better than I was.', '', 'Still building.', 'Still rising.', 'Still becoming.'] },
    ],
    signatureQuote: "I don't just create content — I create a feeling. Every post, every word, every moment is a piece of the universe I'm building.",
    signatureTags: ['Still Building', 'Still Rising', 'Still Becoming'],
};

// @desc  Get My Story content
// @route GET /api/story
// @access Public
const getStory = asyncHandler(async (req, res) => {
    let story = await Story.findOne();
    if (!story) {
        // First run — seed the DB with defaults
        story = await Story.create(DEFAULT_STORY);
    }
    res.status(200).json(story);
});

// @desc  Update My Story content (full replace)
// @route PUT /api/story
// @access Private (Admin)
const updateStory = asyncHandler(async (req, res) => {
    let story = await Story.findOne();
    if (!story) {
        story = await Story.create({ ...DEFAULT_STORY, ...req.body });
    } else {
        const { highlights, chapters, signatureQuote, signatureTags } = req.body;
        if (highlights !== undefined) story.highlights = highlights;
        if (chapters !== undefined) story.chapters = chapters;
        if (signatureQuote !== undefined) story.signatureQuote = signatureQuote;
        if (signatureTags !== undefined) story.signatureTags = signatureTags;
        await story.save();
    }
    res.status(200).json(story);
});

module.exports = { getStory, updateStory };
